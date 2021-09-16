CREATE SCHEMA app;
CREATE SCHEMA app_private;

CREATE ROLE ANONYMOUS;
CREATE ROLE ETUDIANT;
CREATE ROLE MEDECIN;
CREATE ROLE ENSEIGNANT;
CREATE ROLE ATS;

REVOKE ALL ON SCHEMA PUBLIC FROM PUBLIC;
ALTER DEFAULT PRIVILEGES REVOKE ALL ON FUNCTIONS FROM PUBLIC;

GRANT USAGE ON SCHEMA app TO ETUDIANT, MEDECIN, ENSEIGNANT, ATS, ANONYMOUS;

CREATE EXTENSION "uuid-ossp";

CREATE TYPE SEXE AS ENUM ('M', 'F');




CREATE TYPE SPECIALITE AS ENUM ('SIW', 'ISI');

CREATE TYPE ROLE AS ENUM ('ETUDIANT', 'MEDECIN', 'ENSEIGNANT', 'ATS');

CREATE TYPE FAMILY_STATUS AS ENUM ('Celibataire', 'Marie', 'Divorce', 'Veuf');

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
    email VARCHAR UNIQUE,
    role ROLE DEFAULT 'ETUDIANT',
    nom VARCHAR,
    prenom VARCHAR,
    dateDeNaissance DATE,
    sexe SEXE,
    niveau  INT CHECK (niveau >= 1 and niveau <= 5),
    groupe INT CHECK (groupe >= 1 and groupe <= 10),
    specialite SPECIALITE,
    adresse VARCHAR,
    telephone CHAR(10),
    profile_picture VARCHAR,
    family_status FAMILY_STATUS,
    is_completed BOOLEAN DEFAULT FALSE,
    
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT ON app.user_account TO MEDECIN, ETUDIANT, ENSEIGNANT, ATS;
GRANT UPDATE ON app.user_account TO MEDECIN;

ALTER TABLE app.user_account ENABLE ROW LEVEL SECURITY;

CREATE POLICY medecin_select_user_account ON app.user_account FOR SELECT TO MEDECIN USING (TRUE);
CREATE POLICY medecin_update_user_account ON app.user_account FOR UPDATE TO MEDECIN USING (TRUE);

CREATE POLICY patient_select_user_account ON app.user_account FOR SELECT TO ETUDIANT, ENSEIGNANT, ATS USING
    (user_id = nullif (current_setting('jwt.claims.user_id', TRUE),'')::uuid);

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

GRANT SELECT ON app.dossier_medical TO MEDECIN, ETUDIANT, ENSEIGNANT, ATS;

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
GRANT SELECT ON app.biometrique TO ETUDIANT, ENSEIGNANT, ATS;

COMMENT ON TABLE app.biometrique is E'@omit create,delete';
COMMENT ON COLUMN app.biometrique.id is E'@omit update';

-- antecedents personnelles

CREATE TABLE app.antecedents_personnelles (
    id uuid PRIMARY KEY REFERENCES app.dossier_medical (id) ON DELETE CASCADE,
    fumer BOOLEAN,
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
GRANT SELECT ON app.antecedents_personnelles TO ETUDIANT, ENSEIGNANT, ATS;

COMMENT ON TABLE app.antecedents_personnelles is E'@omit create,delete';
COMMENT ON COLUMN app.antecedents_personnelles.id is E'@omit update';


-- rendez vous de petient
CREATE TABLE app.rendez_vous (
    id  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES app.user_account(user_id) ON DELETE CASCADE,
    medecin uuid REFERENCES app.user_account(user_id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL , 
    end_date TIMESTAMP NOT NULL,
    description text null,
    is_valid Boolean DEFAULT TRUE,
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);
GRANT ALL ON app.rendez_vous TO MEDECIN;
GRANT SELECT, INSERT ON app.rendez_vous TO ETUDIANT, ENSEIGNANT, ATS;

-- rdvs of current user

ALTER TABLE app.rendez_vous ENABLE ROW LEVEL SECURITY;

CREATE POLICY medecin_rdv ON app.rendez_vous FOR ALL TO MEDECIN USING
    (medecin = nullif (current_setting('jwt.claims.user_id', TRUE),'')::uuid);

CREATE POLICY patient_rdv ON app.rendez_vous FOR SELECT TO ETUDIANT, ENSEIGNANT, ATS USING
    (user_id = nullif (current_setting('jwt.claims.user_id', TRUE),'')::uuid AND start_date > now() AND is_valid = TRUE);

CREATE POLICY patient_rdv_insert ON app.rendez_vous FOR INSERT TO ETUDIANT, ENSEIGNANT, ATS WITH CHECK (TRUE);

-- current medecin rdvs

CREATE FUNCTION app.set_current_medecin_rendezVous() RETURNS TRIGGER AS $$
BEGIN
    IF  current_setting('jwt.claims.role')::text = 'medecin' THEN
        NEW.medecin = nullif (current_setting('jwt.claims.user_id', TRUE),'')::uuid;
        NEW.is_valid = TRUE;
    ELSE
        NEW.user_id = nullif (current_setting('jwt.claims.user_id', TRUE),'')::uuid;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_medecin_accorder_rende_vous BEFORE INSERT ON app.rendez_vous FOR EACH ROW EXECUTE FUNCTION app.set_current_medecin_rendezVous();
--annèe et groupe

CREATE TABLE app.ecole_niveau (
    niveau  INT CHECK (niveau >= 1 and niveau <= 5) NOT NULL,
    total_groupes INT CHECK (total_groupes >= 1 and total_groupes <= 10) NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY (niveau)
);
GRANT ALL ON app.ecole_niveau TO MEDECIN;


COMMENT ON COLUMN app.ecole_niveau.updated_at is E'@omit create,update,delete';



-- check rdv availability

CREATE TYPE app.check_rdv_availability_type AS (
    r830 BOOLEAN,
    r900 BOOLEAN,
    r930 BOOLEAN,
    r100 BOOLEAN,
    r130 BOOLEAN,
    r110 BOOLEAN,
    r200 BOOLEAN,
    r230 BOOLEAN,
    r300 BOOLEAN,
    r330 BOOLEAN,
    r400 BOOLEAN,
    r430 BOOLEAN
);

CREATE FUNCTION app.check_rdv_availability(date DATE) RETURNS app.check_rdv_availability_type AS $$
    SELECT 
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 08:30'))::timestamp AND end_date <= (CONCAT(date::text, ' 09:00'))::timestamp THEN true ELSE false END) AS r830,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 09:00'))::timestamp AND end_date <= (CONCAT(date::text, ' 09:30'))::timestamp THEN true ELSE false END) AS r900,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 09:30'))::timestamp AND end_date <= (CONCAT(date::text, ' 10:00'))::timestamp THEN true ELSE false END) AS r930,

        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 10:00'))::timestamp AND end_date <= (CONCAT(date::text, ' 10:30'))::timestamp THEN true ELSE false END) AS r100,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 10:30'))::timestamp AND end_date <= (CONCAT(date::text, ' 11:00'))::timestamp THEN true ELSE false END) AS r130,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 11:00'))::timestamp AND end_date <= (CONCAT(date::text, ' 11:30'))::timestamp THEN true ELSE false END) AS r110,

        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 14:00'))::timestamp AND end_date <= (CONCAT(date::text, ' 14:30'))::timestamp THEN true ELSE false END) AS r200,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 14:30'))::timestamp AND end_date <= (CONCAT(date::text, ' 15:00'))::timestamp THEN true ELSE false END) AS r230,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 15:00'))::timestamp AND end_date <= (CONCAT(date::text, ' 15:30'))::timestamp THEN true ELSE false END) AS r300,

        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 15:30'))::timestamp AND end_date <= (CONCAT(date::text, ' 16:00'))::timestamp THEN true ELSE false END) AS r330,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 16:00'))::timestamp AND end_date <= (CONCAT(date::text, ' 16:30'))::timestamp THEN true ELSE false END) AS r400,
        bool_or(CASE WHEN start_date >= (CONCAT(date::text, ' 16:30'))::timestamp AND end_date <= (CONCAT(date::text, ' 17:00'))::timestamp THEN true ELSE false END) AS r430
    FROM app.rendez_vous;
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION app.check_rdv_availability(date) TO MEDECIN, ATS, ETUDIANT, ENSEIGNANT;

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
GRANT SELECT ON app.antecedents_medico_chirugicaux TO ETUDIANT, ENSEIGNANT, ATS;

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

-- user account is completed

CREATE FUNCTION app.set_user_account_is_completed() RETURNS TRIGGER AS $$
BEGIN
    IF 
    NEW.nom IS NOT NULL AND 
    NEW.prenom IS NOT NULL AND 
    NEW.email IS NOT NULL AND
    NEW.dateDeNaissance IS NOT NULL AND
    NEW.sexe IS NOT NULL AND
    NEW.niveau IS NOT NULL AND
    NEW.specialite IS NOT NULL AND
    NEW.family_status IS NOT NULL AND
    NEW.role IS NOT NULL
    THEN
        NEW.is_completed = TRUE;
    ELSE
        NEW.is_completed = FALSE;
    END IF;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_account_is_completed_trigger BEFORE UPDATE ON app.user_account FOR EACH ROW EXECUTE FUNCTION app.set_user_account_is_completed();

-- set biometrique is completed

CREATE FUNCTION app.set_biometrique_is_completed() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.taille IS NOT NULL AND NEW.poid IS NOT NULL AND NEW.imc IS NOT NULL THEN
        NEW.is_completed = TRUE;
    ELSE
        NEW.is_completed = FALSE;
    END IF;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER biometrique_is_completed_trigger BEFORE UPDATE ON app.biometrique FOR EACH ROW EXECUTE FUNCTION app.set_biometrique_is_completed();

-- set biometrique is completed trigger is completed

CREATE FUNCTION app.set_antecedents_personnelles_is_completed() RETURNS TRIGGER AS $$
BEGIN
    IF 
    NEW.fumer IS NOT NULL AND 
    NEW.chiquer IS NOT NULL AND 
    NEW.prise IS NOT NULL AND
    NEW.alcool IS NOT NULL AND
    NEW.medicaments IS NOT NULL 
    THEN
        NEW.is_completed = TRUE;
    ELSE
        NEW.is_completed = FALSE;
    END IF;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER antecedents_personnelles_is_completed_trigger BEFORE UPDATE ON app.antecedents_personnelles FOR EACH ROW EXECUTE FUNCTION app.set_antecedents_personnelles_is_completed();

-- set antecedents medico chirugicaux is completed

CREATE FUNCTION app.set_antecedents_medico_chirugicaux_is_completed() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.affections_congenitales IS NOT NULL THEN
        NEW.is_completed = TRUE;
    ELSE
        NEW.is_completed = FALSE;
    END IF;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER antecedents_medico_chirugicaux_is_completed_trigger BEFORE UPDATE ON app.antecedents_medico_chirugicaux FOR EACH ROW EXECUTE FUNCTION app.set_antecedents_medico_chirugicaux_is_completed();

-- current user

CREATE FUNCTION app.current_user() RETURNS app.user_account AS $$
    SELECT * FROM app.user_account WHERE user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION app.current_user() TO MEDECIN, ATS, ETUDIANT, ENSEIGNANT;

CREATE FUNCTION app.current_role() RETURNS text AS $$
    SELECT current_setting('jwt.claims.role')
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION app.current_role() TO MEDECIN, ATS, ETUDIANT, ENSEIGNANT;

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

GRANT EXECUTE ON FUNCTION app.patients_number_by_role() TO MEDECIN;

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
    GREATEST(app.biometrique.updated_at, app.antecedents_medico_chirugicaux.updated_at, app.antecedents_personnelles.updated_at) AS date,
    (CASE GREATEST(app.biometrique.updated_at, app.antecedents_medico_chirugicaux.updated_at, app.antecedents_personnelles.updated_at)
    WHEN app.biometrique.updated_at THEN 'BIOMETRIQUE'
    WHEN app.antecedents_personnelles.updated_at THEN 'A.P'
    WHEN app.antecedents_medico_chirugicaux.updated_at THEN 'A.M.C'
    END) AS partie
    FROM app.user_account 
    INNER JOIN app.dossier_medical ON app.user_account.user_id = app.dossier_medical.user_id AND role IN ('ETUDIANT', 'ENSEIGNANT', 'ATS')
    INNER JOIN app.biometrique ON app.biometrique.id = app.dossier_medical.id
    INNER JOIN app.antecedents_medico_chirugicaux ON app.antecedents_medico_chirugicaux.id = app.dossier_medical.id
    INNER JOIN app.antecedents_personnelles ON app.antecedents_personnelles.id = app.dossier_medical.id
    INNER JOIN app.user_account AS medecin_user_account ON medecin_user_account.user_id = app.dossier_medical.medecin;
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION app.recent_updated_dossier_medicals() TO MEDECIN;

-- create medecin

CREATE FUNCTION app.create_medecin(
        id uuid,
        username VARCHAR, 
        password VARCHAR,
        email VARCHAR DEFAULT NULL, 
        nom VARCHAR DEFAULT NULL,
        prenom VARCHAR DEFAULT NULL,
        profile_picture VARCHAR DEFAULT NULL
    ) 
    RETURNS TABLE (id uuid) AS $$
        WITH
        ins_mdc_pvt_acc AS (INSERT INTO app_private.user_account (id, username, password) VALUES (create_medecin.id, create_medecin.username, create_medecin.password) RETURNING id)
        INSERT INTO app.user_account(user_id, email, role, nom, prenom, profile_picture) VALUES ((SELECT id FROM ins_mdc_pvt_acc), create_medecin.email, 'MEDECIN', create_medecin.nom, create_medecin.prenom, create_medecin.profile_picture) RETURNING user_id AS id
$$ LANGUAGE sql VOLATILE;

GRANT EXECUTE ON FUNCTION app.create_medecin(uuid, varchar,  varchar, varchar, varchar, varchar, varchar) TO ANONYMOUS;

-- create patients

CREATE FUNCTION app.create_patient(
        id uuid,
        username VARCHAR, 
        password VARCHAR,
        email VARCHAR DEFAULT NULL, 
        nom VARCHAR DEFAULT NULL,
        prenom VARCHAR DEFAULT NULL,
        profile_picture VARCHAR DEFAULT NULL,
        adresse VARCHAR DEFAULT NULL,
        telephone char(10) DEFAULT NULL,
        dateDeNaissance DATE DEFAULT NULL,
        sexe SEXE DEFAULT NULL,
        niveau INT DEFAULT NULL,
        specialite SPECIALITE DEFAULT NULL,
        family_status FAMILY_STATUS DEFAULT NULL,
        role ROLE DEFAULT 'ETUDIANT'
    ) 
    RETURNS TABLE (id uuid) AS $$
        WITH
        ins_pvt_acc AS (INSERT INTO app_private.user_account (id, username, password) VALUES (create_patient.id, create_patient.username, create_patient.password) RETURNING id),
        ins_ds_mdc AS (INSERT INTO app.dossier_medical (user_id) VALUES ((SELECT id FROM ins_pvt_acc)) RETURNING id),
        ins_bio AS(INSERT INTO app.biometrique (id) VALUES ((SELECT id FROM ins_ds_mdc))),
        ins_atc_prs AS (INSERT INTO app.antecedents_personnelles (id) VALUES ((SELECT id FROM ins_ds_mdc))),
        ins_mdc_chgc AS (INSERT INTO app.antecedents_medico_chirugicaux (id) VALUES ((SELECT id FROM ins_ds_mdc)))
        INSERT INTO app.user_account(user_id, email, role, nom, prenom, dateDeNaissance, sexe, niveau, specialite, adresse, telephone, profile_picture, family_status) 
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
            create_patient.telephone,
            create_patient.profile_picture,
            create_patient.family_status
            ) 
            RETURNING user_id AS id;
$$ LANGUAGE sql VOLATILE;

GRANT EXECUTE ON FUNCTION app.create_patient(uuid, varchar, varchar, varchar, varchar, varchar, varchar, varchar, char, date, sexe, int, specialite, family_status, role) TO ANONYMOUS;

-- assign medecin to patient

CREATE FUNCTION app.assign_medecin_to_patient(patient_id uuid, medecin_id uuid) RETURNS SETOF app.user_account AS $$
BEGIN
    UPDATE app.dossier_medical SET medecin = assign_medecin_to_patient.medecin_id WHERE user_id = assign_medecin_to_patient.patient_id;
    RETURN QUERY SELECT * FROM app.user_account WHERE user_id = assign_medecin_to_patient.patient_id;
END
$$ LANGUAGE plpgsql VOLATILE;

GRANT EXECUTE ON FUNCTION app.assign_medecin_to_patient(uuid, uuid) TO MEDECIN;

-- completed dossier medicals counter

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

CREATE FUNCTION app.all_completed_dossier_medicals_counter() 
    RETURNS app.completed_uncompleted AS $$
        WITH 
            completed_dm AS (
                SELECT COUNT(CASE WHEN bio.is_completed IS TRUE AND atp.is_completed IS TRUE AND atc.is_completed IS TRUE THEN TRUE END) AS completed 
                FROM app.user_account INNER JOIN app.dossier_medical ON app.user_account.user_id = app.dossier_medical.user_id AND app.user_account.role IN ('ETUDIANT', 'ENSEIGNANT', 'ATS')
                INNER JOIN app.biometrique AS bio ON bio.id = app.dossier_medical.id
                INNER JOIN app.antecedents_personnelles AS atp ON bio.id = atp.id
                INNER JOIN app.antecedents_medico_chirugicaux AS atc ON bio.id = atc.id
            )
            SELECT (SELECT completed FROM completed_dm), (COUNT(user_id) - (SELECT completed FROM completed_dm)) AS not_completed FROM app.user_account WHERE role IN ('ETUDIANT', 'ENSEIGNANT', 'ATS');
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION app.completed_dossier_medicals_counter(role) TO MEDECIN;
GRANT EXECUTE ON FUNCTION app.all_completed_dossier_medicals_counter() TO MEDECIN;

-- examen medical

CREATE TABLE app.examen_medical (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dossier_medical_id uuid REFERENCES app.dossier_medical (id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX ON app.examen_medical (dossier_medical_id);

GRANT SELECT, UPDATE, INSERT ON app.examen_medical TO MEDECIN;

COMMENT ON TABLE app.examen_medical is E'@omit delete';
-- COMMENT ON COLUMN app.examen_medical.id is E'@omit create';
COMMENT ON COLUMN app.examen_medical.created_at is E'@omit create,update';
COMMENT ON COLUMN app.examen_medical.updated_at is E'@omit create,update';

GRANT EXECUTE ON FUNCTION uuid_generate_v4() TO MEDECIN, ENSEIGNANT, ETUDIANT, ATS;

-- rapport

CREATE TABLE app.rapport_medical (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.rapport_medical TO MEDECIN;

COMMENT ON TABLE app.rapport_medical is E'@omit create,delete';
COMMENT ON COLUMN app.rapport_medical.id is E'@omit update';

-- peau et muqueuses

CREATE TABLE app.peau_et_muqueuses (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    affections_cutanees VARCHAR,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.peau_et_muqueuses TO MEDECIN;

COMMENT ON TABLE app.peau_et_muqueuses is E'@omit create,delete';
COMMENT ON COLUMN app.peau_et_muqueuses.id is E'@omit update';

-- ophtalmologique

CREATE TABLE app.ophtalmologique (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    larmolement BOOLEAN,
    douleurs BOOLEAN,
    taches_devant_les_yeux BOOLEAN,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.ophtalmologique TO MEDECIN;

COMMENT ON TABLE app.ophtalmologique is E'@omit create,delete';
COMMENT ON COLUMN app.ophtalmologique.id is E'@omit update';

-- orl

CREATE TABLE app.orl (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    siflements BOOLEAN,
    angines_repetees BOOLEAN,
    expitaxis BOOLEAN,
    rhinorthee BOOLEAN,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.orl TO MEDECIN;

COMMENT ON TABLE app.orl is E'@omit create,delete';
COMMENT ON COLUMN app.orl.id is E'@omit update';

-- locomoteur

CREATE TABLE app.locomoteur (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.locomoteur TO MEDECIN;

COMMENT ON TABLE app.locomoteur is E'@omit create,delete';
COMMENT ON COLUMN app.locomoteur.id is E'@omit update';

-- respiratoire

CREATE TABLE app.respiratoire (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.respiratoire TO MEDECIN;

COMMENT ON TABLE app.respiratoire is E'@omit create,delete';
COMMENT ON COLUMN app.respiratoire.id is E'@omit update';

-- cardio vasculaire

CREATE TABLE app.cardio_vasculaire (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.cardio_vasculaire TO MEDECIN;

COMMENT ON TABLE app.cardio_vasculaire is E'@omit create,delete';
COMMENT ON COLUMN app.cardio_vasculaire.id is E'@omit update';

-- digestif

CREATE TABLE app.digestif (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.digestif TO MEDECIN;

COMMENT ON TABLE app.digestif is E'@omit create,delete';
COMMENT ON COLUMN app.digestif.id is E'@omit update';

-- genito urinaire

CREATE TABLE app.genito_urinaire (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.genito_urinaire TO MEDECIN;

COMMENT ON TABLE app.genito_urinaire is E'@omit create,delete';
COMMENT ON COLUMN app.genito_urinaire.id is E'@omit update';

-- Neurologique et Psychisme

CREATE TABLE app.neurologique_psychisme (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.neurologique_psychisme TO MEDECIN;

COMMENT ON TABLE app.neurologique_psychisme is E'@omit create,delete';
COMMENT ON COLUMN app.neurologique_psychisme.id is E'@omit update';

-- Hématologie et Ganglionnaire

CREATE TABLE app.hematologie_anglionnaire (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.hematologie_anglionnaire TO MEDECIN;

COMMENT ON TABLE app.hematologie_anglionnaire is E'@omit create,delete';
COMMENT ON COLUMN app.hematologie_anglionnaire.id is E'@omit update';

-- Endocrinologie

CREATE TABLE app.endocrinologie (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.endocrinologie TO MEDECIN;

COMMENT ON TABLE app.endocrinologie is E'@omit create,delete';
COMMENT ON COLUMN app.endocrinologie.id is E'@omit update';

-- Profile Psychologique

CREATE TABLE app.profile_psychologique (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.profile_psychologique TO MEDECIN;

COMMENT ON TABLE app.profile_psychologique is E'@omit create,delete';
COMMENT ON COLUMN app.profile_psychologique.id is E'@omit update';

-- Examens Complémentaires

CREATE TABLE app.examens_complementaires (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.examens_complementaires TO MEDECIN;

COMMENT ON TABLE app.examens_complementaires is E'@omit create,delete';
COMMENT ON COLUMN app.examens_complementaires.id is E'@omit update';

-- Examens Complémentaires

CREATE TABLE app.orientation (
    id uuid PRIMARY KEY REFERENCES app.examen_medical (id) ON DELETE CASCADE,
    notes VARCHAR[],
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, INSERT ON app.orientation TO MEDECIN;

COMMENT ON TABLE app.orientation is E'@omit create,delete';
COMMENT ON COLUMN app.orientation.id is E'@omit update';

-- updated at

CREATE TRIGGER set_app_examen_medical_updated_at BEFORE UPDATE ON app.examen_medical FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_app_rapport_medical_updated_at BEFORE UPDATE ON app.rapport_medical FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_app_peau_et_muqueuses_updated_at BEFORE UPDATE ON app.peau_et_muqueuses FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_ophtalmologique_updated_at BEFORE UPDATE ON app.ophtalmologique FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_orl_updated_at BEFORE UPDATE ON app.orl FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_locomoteur_updated_at BEFORE UPDATE ON app.locomoteur FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_respiratoire_updated_at BEFORE UPDATE ON app.respiratoire FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_cardio_vasculaire_updated_at BEFORE UPDATE ON app.cardio_vasculaire FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_digestif_updated_at BEFORE UPDATE ON app.digestif FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_genito_urinaire_updated_at BEFORE UPDATE ON app.genito_urinaire FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();

CREATE TRIGGER set_neurologique_psychisme_updated_at BEFORE UPDATE ON app.neurologique_psychisme FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_hematologie_anglionnaire_updated_at BEFORE UPDATE ON app.hematologie_anglionnaire FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_endocrinologie_updated_at BEFORE UPDATE ON app.endocrinologie FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_profile_psychologique_updated_at BEFORE UPDATE ON app.profile_psychologique FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_examens_complementaires_updated_at BEFORE UPDATE ON app.examens_complementaires FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();
CREATE TRIGGER set_orientation_updated_at BEFORE UPDATE ON app.orientation FOR EACH ROW EXECUTE FUNCTION app.set_current_timestamp_updated_at();

-- create examen medical triggers

CREATE FUNCTION app.init_table() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO app.rapport_medical (id) VALUES (NEW.id);
    INSERT INTO app.peau_et_muqueuses (id) VALUES (NEW.id);
    INSERT INTO app.ophtalmologique (id) VALUES (NEW.id);
    INSERT INTO app.orl (id) VALUES (NEW.id);
    INSERT INTO app.locomoteur (id) VALUES (NEW.id);
    INSERT INTO app.respiratoire (id) VALUES (NEW.id);
    INSERT INTO app.cardio_vasculaire (id) VALUES (NEW.id);
    INSERT INTO app.digestif (id) VALUES (NEW.id);
    INSERT INTO app.genito_urinaire (id) VALUES (NEW.id);

    INSERT INTO app.neurologique_psychisme (id) VALUES (NEW.id);
    INSERT INTO app.hematologie_anglionnaire (id) VALUES (NEW.id);
    INSERT INTO app.endocrinologie (id) VALUES (NEW.id);
    INSERT INTO app.profile_psychologique (id) VALUES (NEW.id);
    INSERT INTO app.examens_complementaires (id) VALUES (NEW.id);
    INSERT INTO app.orientation (id) VALUES (NEW.id);
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER init_peau_et_muqueuses AFTER INSERT ON app.examen_medical FOR EACH ROW EXECUTE FUNCTION app.init_table();

-- statistics

CREATE TYPE app.statistics_type as (
    etudiant INT,
    enseignant INT,
    ats INT,
    total INT,
    homme INT,
    femme INT
);

CREATE FUNCTION app.statistics(days INT) RETURNS app.statistics_type AS $$
WITH wid AS (
    SELECT id FROM app_private.user_account WHERE created_at > (CURRENT_DATE - statistics.days * INTERVAL '1 DAY')
)
SELECT * FROM
(SELECT COUNT(user_id) AS etudiant FROM app.user_account INNER JOIN (SELECT id FROM wid) AS r ON user_id = r.id WHERE role = 'ETUDIANT') AS a,
(SELECT COUNT(user_id) AS enseignant FROM app.user_account INNER JOIN (SELECT id FROM wid) AS r ON user_id = r.id WHERE role = 'ENSEIGNANT') AS b,
(SELECT COUNT(user_id) AS ats FROM app.user_account INNER JOIN (SELECT id FROM wid) AS r ON user_id = r.id WHERE role = 'ATS') AS c,
(SELECT COUNT(user_id) AS total FROM app.user_account INNER JOIN (SELECT id FROM wid) AS r ON user_id = r.id WHERE role = 'ETUDIANT' OR role = 'ENSEIGNANT' OR role = 'ATS') AS d,
(SELECT COUNT(user_id) AS homme FROM app.user_account INNER JOIN (SELECT id FROM wid) AS r ON user_id = r.id WHERE sexe = 'M') AS e,
(SELECT COUNT(user_id) AS femme FROM app.user_account INNER JOIN (SELECT id FROM wid) AS r ON user_id = r.id WHERE sexe = 'F') AS f
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION app.statistics(INT) TO MEDECIN;

-- recent medical exames

CREATE FUNCTION app.recent_examen_medicals() 
RETURNS TABLE (
    nom varchar,
    prenom varchar,
    profile_picture varchar,
    user_id uuid,
    role ROLE,
    examen_id uuid,
    last_edit varchar
)
 AS $$
    WITH lst AS (
    SELECT app.examen_medical.id AS examen_id, LEAST(app.peau_et_muqueuses.updated_at, app.peau_et_muqueuses.updated_at, app.orl.updated_at) AS least FROM app.user_account 
    INNER JOIN app.dossier_medical ON app.user_account.user_id = app.dossier_medical.user_id AND role IN ('ETUDIANT', 'ENSEIGNANT', 'ATS')
    INNER JOIN app.examen_medical ON app.dossier_medical.id = app.examen_medical.dossier_medical_id
    INNER JOIN app.peau_et_muqueuses ON app.examen_medical.id = app.peau_et_muqueuses.id
    INNER JOIN app.ophtalmologique ON app.examen_medical.id = app.ophtalmologique.id
    INNER JOIN app.orl ON app.examen_medical.id = app.orl.id
    )
    SELECT 
    nom, prenom, profile_picture, app.user_account.user_id, role, app.examen_medical.id AS examen_id,
    CASE
        WHEN (SELECT EXTRACT(EPOCH FROM (now() - lst.least)) < 60) THEN (CONCAT((SELECT EXTRACT(EPOCH FROM (now() - lst.least))::int)::text, 's'))
        WHEN (SELECT EXTRACT(EPOCH FROM (now() - lst.least)) / 60 < 60) THEN (CONCAT((((SELECT EXTRACT(EPOCH FROM (now() - lst.least))) / 60)::int)::text, 'm'))
        WHEN (SELECT EXTRACT(EPOCH FROM (now() - lst.least)) / (60 * 60) < 24) THEN (CONCAT((((SELECT EXTRACT(EPOCH FROM (now() - lst.least))) / (60 * 60))::int)::text, 'h'))
        ELSE '99'
    END AS last_edit
    FROM app.user_account 
    INNER JOIN app.dossier_medical ON app.user_account.user_id = app.dossier_medical.user_id AND role IN ('ETUDIANT', 'ENSEIGNANT', 'ATS')
    INNER JOIN app.examen_medical ON app.dossier_medical.id = app.examen_medical.dossier_medical_id
    INNER JOIN lst ON app.examen_medical.id = lst.examen_id;
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION app.recent_examen_medicals() TO MEDECIN;

-- insert users

SELECT app.create_medecin('48cfbc46-fdcd-4b97-8ab1-03c469981506', 'rakikoove', '0YAQ7j50b9vLqrgjVS2oVF8F6', 'rakikoove@esi-sba.dz', 'Bendada', 'Moncef', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
SELECT app.create_medecin('74dc5a42-79ca-48ac-97fc-2e682e0efec7', 'mesmoudi13', 'e7KHTiptaG28KkBekwOOgoCar', 'mesmoudi13@esi-sba.dz', 'Mesmoudi', 'Moudi', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
SELECT app.create_medecin('98f451b8-8aa4-4dc3-90a4-e745288de8bb', 'mhammed-sed', '>{j${=@XWt*"T(j[Q1LD<oni)', 'mhammed-sed@esi-sba.dz', 'Sedaoui', 'Muhammed', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
SELECT app.create_medecin('cc04529e-8e39-456f-b1f7-80bc6c726e02', 'a.boussaid', 'sKG6PUENEUlIDYWtTnQKFkFYi', 'a.boussaidd@esi-sba.dz', 'Sedaoui', 'Muhammed', 'https://images.pexels.com/photos/2169500/pexels-photo-2169500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');

SELECT app.create_patient('767f4741-4473-4d19-9e96-39b9abb01bc6', 'etudiant1', 'password', 'etudiant1@esi-sba.dz', 'Alimaia', 'Bouchiba', 'https://images.unsplash.com/photo-1560329072-17f59dcd30a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=767&q=80', '102 Rue Haddad Layachi, 19600', '0678569874', '2000-05-17', 'F', '3', 'SIW', 'Celibataire');
SELECT app.create_patient('84fa94cc-cd5d-449d-a4fa-197d0bf195b7', 'etudiant2', 'password', 'etudiant2@esi-sba.dz', 'Amrouche', 'Aleser', 'https://images.pexels.com/photos/3812011/pexels-photo-3812011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', '93 RUE EMIR KHALED, Oran El M Naouer', '0123654789', '2001-04-10', 'M');
SELECT app.create_patient('346be089-fbf2-47ca-b356-21726341f56f', 'etudiant3', 'password', 'etudiant3@esi-sba.dz', 'Hadya', 'Madani', 'https://images.unsplash.com/photo-1611590027211-b954fd027b51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=677&q=80', '93 RUE EMIR KHALED, Oran El M Naouer', '0123654789', '2001-04-10', 'F');
SELECT app.create_patient('a98ae20e-24f1-415d-b65c-279895e1ce95', 'etudiant4', 'password', 'etudiant4@esi-sba.dz', 'Haris', 'Zakaria', 'https://images.unsplash.com/photo-1616707694728-599b59672d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80', '93 RUE EMIR KHALED, Oran El M Naouer', '0123654789', '2001-04-10', 'M');
SELECT app.create_patient('4881920c-c965-4f24-95a2-0c0071f25b79', 'etudiant5', 'password', 'etudiant5@esi-sba.dz', 'Ameena ', 'Rachedi', 'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHBvcnRhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', '93 RUE EMIR KHALED, Oran El M Naouer', '0123654789', '2001-04-10', 'F');

SELECT app.create_patient('419d7a76-fcc6-4ed0-b95d-4d215d6b1dc9', 'enseignant1', 'password', 'enseignant1@esi-sba.dz', 'Omer', 'Benguigui', 'https://images.unsplash.com/photo-1559548331-f9cb98001426?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', '93 RUE EMIR KHALED, Oran El M Naouer', '0123654789', '1980-04-10', 'M', null, null, null, 'ENSEIGNANT');
SELECT app.create_patient('8102452c-f667-4979-bf23-ec485356573d', 'enseignant2', 'password', 'enseignant2@esi-sba.dz', 'Tariq', 'Timsit', 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', '93 RUE EMIR KHALED, Oran El M Naouer', '0123654789', '1980-04-10', 'M', null, null, null, 'ENSEIGNANT');
SELECT app.create_patient('873aafe4-0d33-4d5a-b95f-f3a5e6cfac1d', 'enseignant3', 'password', 'enseignant3@esi-sba.dz', 'Kaseem', 'Bitat', 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', '93 RUE EMIR KHALED, Oran El M Naouer', '0123654789', '1980-04-10', 'M', null, null, null, 'ENSEIGNANT');


SELECT app.assign_medecin_to_patient('767f4741-4473-4d19-9e96-39b9abb01bc6', 'cc04529e-8e39-456f-b1f7-80bc6c726e02');
SELECT app.assign_medecin_to_patient('84fa94cc-cd5d-449d-a4fa-197d0bf195b7', '74dc5a42-79ca-48ac-97fc-2e682e0efec7');

SELECT app.assign_medecin_to_patient('346be089-fbf2-47ca-b356-21726341f56f', 'cc04529e-8e39-456f-b1f7-80bc6c726e02');
SELECT app.assign_medecin_to_patient('a98ae20e-24f1-415d-b65c-279895e1ce95', '98f451b8-8aa4-4dc3-90a4-e745288de8bb');
SELECT app.assign_medecin_to_patient('4881920c-c965-4f24-95a2-0c0071f25b79', '48cfbc46-fdcd-4b97-8ab1-03c469981506');
