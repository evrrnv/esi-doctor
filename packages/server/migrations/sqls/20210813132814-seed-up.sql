CREATE SCHEMA app;
CREATE SCHEMA app_private;

CREATE ROLE ANONYMOUS;
CREATE ROLE ETUDIANT;
CREATE ROLE MEDECIN;
CREATE ROLE ENSEIGNANT;
CREATE ROLE ATS;

GRANT USAGE ON SCHEMA app TO ETUDIANT, MEDECIN, ENSEIGNANT, ATS, ANONYMOUS;

CREATE EXTENSION "uuid-ossp";

CREATE TYPE SEXE AS ENUM ('M', 'F');

CREATE TYPE SPECIALITE AS ENUM ('SIW', 'ISI');

CREATE TYPE ROLE AS ENUM ('ETUDIANT', 'MEDECIN', 'ENSEIGNANT', 'ATS');

CREATE TABLE app_private.user_account (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_id varchar,
    username varchar NOT NULL UNIQUE,
    password varchar,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- user_account

CREATE TABLE app.user_account (
    user_id uuid PRIMARY KEY REFERENCES app_private.user_account (id) ON DELETE CASCADE,
    numero SERIAL,
    email varchar UNIQUE,
    role ROLE DEFAULT 'ETUDIANT',
    nom varchar,
    prenom varchar,
    dateDeNaissance DATE,
    sexe SEXE,
    niveau  INT CHECK (niveau >= 1 and niveau <= 5),
    specialite SPECIALITE,
    adresse varchar,
    telephone char(10),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT ON app.user_account TO MEDECIN, ETUDIANT, ENSEIGNANT, ATS;

ALTER TABLE app.user_account ENABLE ROW LEVEL SECURITY;

CREATE POLICY medecin_select_user_account ON app.user_account FOR SELECT TO MEDECIN USING (TRUE);

CREATE POLICY patient_select_user_account ON app.user_account FOR SELECT TO ETUDIANT, ENSEIGNANT, ATS USING
    (user_id = nullif (current_setting('jwt.claims.user_id', TRUE),'')::uuid);

REVOKE SELECT ON app.user_account FROM ETUDIANT, ENSEIGNANT, ATS;

COMMENT ON TABLE app.user_account is E'@omit create,delete';
COMMENT ON COLUMN app.user_account.email is E'@omit update';
COMMENT ON COLUMN app.user_account.user_id is E'@omit update\n@name id';
COMMENT ON COLUMN app.user_account.updated_at is E'@omit create,update';

-- dossier_medical

CREATE TABLE app.dossier_medical (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES app.user_account (user_id) ON DELETE CASCADE,
    medecin uuid REFERENCES app.user_account (user_id) ON DELETE CASCADE,
    numero SERIAL
);

GRANT SELECT ON app.dossier_medical TO MEDECIN;

CREATE INDEX ON app.dossier_medical (user_id);

COMMENT ON TABLE app.dossier_medical is E'@omit create,update,delete';

-- biometrique

CREATE TABLE app.biometrique (
    id uuid PRIMARY KEY REFERENCES app.dossier_medical (id) ON DELETE CASCADE,
    taille INT,
    poid INT,
    imc INT,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON app.biometrique TO MEDECIN;

COMMENT ON TABLE app.biometrique is E'@omit create,delete';
COMMENT ON COLUMN app.biometrique.id is E'@omit update';

-- antecedents personnelles

CREATE TABLE app.antecedents_personnelles (
    id uuid PRIMARY KEY REFERENCES app.dossier_medical (id) ON DELETE CASCADE,
    fummer BOOLEAN,
    nombre_de_cigarattes INT,
    joures_de_cigarattes INT,
    chiquer BOOLEAN,
    nombre_de_boites_de_chique INT,
    joures_de_chiques INT,
    prise BOOLEAN,
    nombre_de_boites_de_prise INT,
    joures_de_prise INT,
    alcool BOOLEAN,
    ancien_fumeur BOOLEAN,
    periode_dexposition INT,
    medicaments BOOLEAN,
    autres VARCHAR,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON app.antecedents_personnelles TO MEDECIN;

COMMENT ON TABLE app.antecedents_personnelles is E'@omit create,delete';
COMMENT ON COLUMN app.antecedents_personnelles.id is E'@omit update';

-- antecedents medico chirugicaux

CREATE TABLE app.antecedents_medico_chirugicaux (
    id uuid PRIMARY KEY REFERENCES app.dossier_medical (id) ON DELETE CASCADE,
    affections_congenitales VARCHAR[],
    maladies_generales VARCHAR[],
    interventions_chirugicales VARCHAR[],
    reactions_allergiques_aux_medicaments VARCHAR[],
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON app.antecedents_medico_chirugicaux TO MEDECIN;

COMMENT ON TABLE app.antecedents_medico_chirugicaux is E'@omit create,delete';
COMMENT ON COLUMN app.antecedents_medico_chirugicaux.id is E'@omit update';

-- updated at

CREATE FUNCTION app.set_current_timestamp_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_app_private_user_account_updated_at BEFORE UPDATE ON app_private.user_account FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_app_user_account_updated_at BEFORE UPDATE ON app.user_account FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER seSQLt_app_biometrique_updated_at BEFORE UPDATE ON app.biometrique FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_app_antecedents_personnelles_updated_at BEFORE UPDATE ON app.antecedents_personnelles FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_app_antecedents_medico_chirugicaux_updated_at BEFORE UPDATE ON app.antecedents_medico_chirugicaux FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();

-- current user

CREATE FUNCTION app.current_user() RETURNS app.user_account AS $$
    SELECT * FROM app.user_account WHERE user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ LANGUAGE SQL STABLE;

-- patiens number by role

CREATE FUNCTION app.patients_number_by_role()
    RETURNS TABLE(
        role ROLE,
        count INT
    ) AS $$
    SELECT * FROM (SELECT rl.role, COUNT(user_id)
    FROM (SELECT unnest(enum_range(NULL::ROLE)) AS role) rl LEFT JOIN app.user_account u ON u.role = rl.role
    GROUP BY rl.role) a WHERE role <> 'MEDECIN';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- recent updated medical files

CREATE FUNCTION app.recent_updated_dossier_medicals() 
    RETURNS TABLE(
        numero INT, 
        patient_nom VARCHAR, 
        patient_prenom VARCHAR, 
        numero_dossier_medical INT, 
        medecin_nom VARCHAR, 
        medecin_prenom VARCHAR, 
        date TIMESTAMP, 
        partie VARCHAR
    ) AS $$
    SELECT 
    app.user_account.numero AS numero, 
    app.user_account.nom AS patient_nom, 
    app.user_account.prenom AS patient_prenom, 
    app.dossier_medical.numero AS numero_dossier_medical, 
    medecin_user_account.nom AS medecin_nom, 
    medecin_user_account.prenom AS medecin_prenom,
    LEAST(app.biometrique.updated_at, app.antecedents_medico_chirugicaux.updated_at, app.antecedents_personnelles.updated_at) AS date,
    (CASE LEAST(app.biometrique.updated_at, app.antecedents_medico_chirugicaux.updated_at, app.antecedents_personnelles.updated_at)
    WHEN app.biometrique.updated_at THEN 'BIOMETRIQUE'
    WHEN app.antecedents_personnelles.updated_at THEN 'ANTECEDENTS PERSONNELLES'
    WHEN app.antecedents_medico_chirugicaux.updated_at THEN 'ANTECEDENTS MEDICO CHIRUGICAUX'
    END) AS partie
    FROM app.user_account 
    INNER JOIN app.dossier_medical ON app.user_account.user_id = app.dossier_medical.user_id AND role IN ('ETUDIANT', 'ENSEIGNANT', 'ATS')
    INNER JOIN app.biometrique ON app.biometrique.id = app.dossier_medical.id
    INNER JOIN app.antecedents_medico_chirugicaux ON app.antecedents_medico_chirugicaux.id = app.dossier_medical.id
    INNER JOIN app.antecedents_personnelles ON app.antecedents_personnelles.id = app.dossier_medical.id
    INNER JOIN app.user_account AS medecin_user_account ON medecin_user_account.user_id = app.dossier_medical.medecin;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- create medecin

CREATE FUNCTION app.create_medecin(
        id uuid,
        username VARCHAR, 
        password VARCHAR,
        email VARCHAR DEFAULT NULL, 
        nom VARCHAR DEFAULT NULL,
        prenom VARCHAR DEFAULT NULL
    ) 
    RETURNS TABLE (id uuid) AS $$
        WITH
        ins_mdc_pvt_acc AS (INSERT INTO app_private.user_account (id, username, password) VALUES (create_medecin.id, create_medecin.username, create_medecin.password) RETURNING id)
        INSERT INTO app.user_account(user_id, email, role, nom, prenom) VALUES ((SELECT id FROM ins_mdc_pvt_acc), create_medecin.email, 'MEDECIN', create_medecin.nom, create_medecin.prenom) RETURNING user_id AS id
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;

-- create patients

CREATE FUNCTION app.create_patient(
        id uuid,
        username VARCHAR, 
        password VARCHAR,
        email VARCHAR DEFAULT NULL, 
        nom VARCHAR DEFAULT NULL,
        prenom VARCHAR DEFAULT NULL,
        role ROLE DEFAULT 'ETUDIANT',
        dateDeNaissance DATE DEFAULT NULL,
        sexe SEXE DEFAULT NULL,
        niveau INT DEFAULT NULL,
        specialite SPECIALITE DEFAULT NULL,
        adresse VARCHAR DEFAULT NULL,
        telephone char(10) DEFAULT NULL
    ) 
    RETURNS TABLE (id uuid) AS $$
        WITH
        ins_pvt_acc AS (INSERT INTO app_private.user_account (id, username, password) VALUES (create_patient.id, create_patient.username, create_patient.password) RETURNING id),
        ins_ds_mdc AS (INSERT INTO app.dossier_medical (user_id) VALUES ((SELECT id FROM ins_pvt_acc)) RETURNING id),
        ins_bio AS(INSERT INTO app.biometrique (id) VALUES ((SELECT id FROM ins_ds_mdc))),
        ins_atc_prs AS (INSERT INTO app.antecedents_personnelles (id) VALUES ((SELECT id FROM ins_ds_mdc))),
        ins_mdc_chgc AS (INSERT INTO app.antecedents_medico_chirugicaux (id) VALUES ((SELECT id FROM ins_ds_mdc)))
        INSERT INTO app.user_account(user_id, email, role, nom, prenom, dateDeNaissance, sexe, niveau, specialite, adresse, telephone) 
        VALUES (
            (SELECT id FROM ins_pvt_acc), 
            create_patient.email, 
            create_patient.role, 
            create_patient.nom, 
            create_patient.prenom, 
            create_patient.dateDeNaissance, 
            create_patient.sexe, 
            create_patient.niveau, 
            create_patient.specialite, 
            create_patient.adresse, 
            create_patient.telephone
            ) 
            RETURNING user_id AS id;
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;

-- assign medecin to patient

CREATE FUNCTION app.assign_medecin_to_patient(patient_id uuid, medecin_id uuid) RETURNS SETOF app.user_account AS $$
BEGIN
    UPDATE app.dossier_medical SET medecin = assign_medecin_to_patient.medecin_id WHERE user_id = assign_medecin_to_patient.patient_id;
    RETURN QUERY SELECT * FROM app.user_account WHERE user_id = assign_medecin_to_patient.patient_id;
END
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

-- completed dossier medicals counter

-- SELECT id FROM app.dossier_medical WHERE user_id = '767f4741-4473-4d19-9e96-39b9abb01bc6'

CREATE TYPE app.completed_uncompleted as (
    completed INT,
    not_completed INT
);

CREATE FUNCTION app.completed_dossier_medicals_counter(role ROLE) 
    RETURNS app.completed_uncompleted AS $$
        WITH 
        completed_dm AS (
            SELECT COUNT(CASE WHEN bio.is_completed IS TRUE AND atp.is_completed IS TRUE AND atc.is_completed IS TRUE THEN TRUE END) AS completed 
            FROM app.user_account INNER JOIN app.dossier_medical ON app.user_account.user_id = app.dossier_medical.user_id AND app.user_account.role = completed_dossier_medicals_counter.role
            INNER JOIN app.biometrique AS bio ON bio.id = app.dossier_medical.id
            INNER JOIN app.antecedents_personnelles AS atp ON bio.id = atp.id
            INNER JOIN app.antecedents_medico_chirugicaux AS atc ON bio.id = atc.id
        )
        SELECT (SELECT completed FROM completed_dm), (COUNT(user_id) - (SELECT completed FROM completed_dm)) AS not_completed FROM app.user_account WHERE role = completed_dossier_medicals_counter.role;
$$ LANGUAGE SQL STABLE;

-- insert users

SELECT app.create_medecin('48cfbc46-fdcd-4b97-8ab1-03c469981506', 'rakikoove', '0YAQ7j50b9vLqrgjVS2oVF8F6', 'rakikoove@esi-sba.dz', 'Bendada', 'Moncef');
SELECT app.create_medecin('74dc5a42-79ca-48ac-97fc-2e682e0efec7', 'mesmoudi13', 'e7KHTiptaG28KkBekwOOgoCar', 'mesmoudi13@esi-sba.dz', 'Mesmoudi', 'Moudi');
SELECT app.create_medecin('98f451b8-8aa4-4dc3-90a4-e745288de8bb', 'mhammed-sed', '>{j${=@XWt*"T(j[Q1LD<oni)', 'mhammed-sed@esi-sba.dz', 'Sedaoui', 'Muhammed');
SELECT app.create_medecin('cc04529e-8e39-456f-b1f7-80bc6c726e02', 'a.boussaid', 'sKG6PUENEUlIDYWtTnQKFkFYi', 'a.boussaidd@esi-sba.dz', 'Sedaoui', 'Muhammed');

SELECT app.create_patient('767f4741-4473-4d19-9e96-39b9abb01bc6', 'etudiant1', 'password', 'etudiant1@esi-sba.dz', 'Alimaia', 'Bouchiba');
SELECT app.create_patient('84fa94cc-cd5d-449d-a4fa-197d0bf195b7', 'etudiant2', 'password', 'etudiant2@esi-sba.dz', 'Amrouche', 'Aleser');

SELECT app.assign_medecin_to_patient('767f4741-4473-4d19-9e96-39b9abb01bc6', 'cc04529e-8e39-456f-b1f7-80bc6c726e02');
SELECT app.assign_medecin_to_patient('7150e9aa-b8be-4c5a-bc8d-653b0deaab96', '74dc5a42-79ca-48ac-97fc-2e682e0efec7');