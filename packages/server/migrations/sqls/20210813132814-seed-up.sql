CREATE SCHEMA app;
CREATE SCHEMA app_private;

CREATE ROLE ANONYMOUS;
CREATE ROLE ETUDIANT;
CREATE ROLE MEDECIN;
CREATE ROLE ENSEIGNANT;
CREATE ROLE ATS;

GRANT USAGE ON SCHEMA app TO ETUDIANT, MEDECIN, ENSEIGNANT, ATS;

CREATE EXTENSION "uuid-ossp";

CREATE TYPE SEXE AS ENUM ('M', 'F');

CREATE TYPE SPECIALITE AS ENUM ('SIW', 'ISI');

CREATE TYPE ROLE AS ENUM ('ETUDIANT', 'MEDECIN', 'ENSEIGNANT', 'ATS');

CREATE TABLE app_private.user_account (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_id varchar,
    username varchar NOT NULL UNIQUE,
    password varchar,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

-- user_account

CREATE TABLE app.user_account (
    user_id uuid PRIMARY KEY REFERENCES app_private.user_account (id) ON DELETE CASCADE,
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
    updated_at timestamp NOT NULL DEFAULT now()
);

GRANT SELECT ON app.user_account TO MEDECIN, ETUDIANT, ENSEIGNANT, ATS;

ALTER TABLE app.user_account ENABLE ROW LEVEL SECURITY;

CREATE POLICY medecin_select_user_account ON app.user_account FOR SELECT TO MEDECIN USING (role IN ('ETUDIANT', 'ENSEIGNANT', 'ATS'));

CREATE POLICY patient_select_user_account ON app.user_account FOR SELECT TO ETUDIANT, ENSEIGNANT, ATS USING
    (user_id = nullif (current_setting('jwt.claims.user_id', TRUE),'')::uuid);

COMMENT ON TABLE app.user_account is E'@omit create,delete';
COMMENT ON COLUMN app.user_account.email is E'@omit update';
COMMENT ON COLUMN app.user_account.user_id is E'@omit update';
COMMENT ON COLUMN app.user_account.updated_at is E'@omit create,update';

-- dossier_medical

CREATE TABLE app.dossier_medical (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES app.user_account (user_id) ON DELETE CASCADE
);

GRANT SELECT ON app.dossier_medical TO MEDECIN;

CREATE INDEX ON app.dossier_medical (user_id);

COMMENT ON TABLE app.dossier_medical is E'@omit create,update,delete';

-- biometrique

CREATE TABLE app.biometrique (
    id uuid PRIMARY KEY REFERENCES app.dossier_medical (id) ON DELETE CASCADE,
    taille INT,
    poid INT,
    imc INT
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
    autres VARCHAR
);

GRANT SELECT, UPDATE ON app.antecedents_personnelles TO MEDECIN;

COMMENT ON TABLE app.antecedents_personnelles is E'@omit create,delete';
COMMENT ON COLUMN app.antecedents_personnelles.id is E'@omit update';

-- antecedents medico chirugicaux

CREATE TABLE app.medico_chirugicaux (
    id uuid PRIMARY KEY REFERENCES app.dossier_medical (id) ON DELETE CASCADE,
    affections_congenitales VARCHAR[],
    maladies_generales VARCHAR[],
    interventions_chirugicales VARCHAR[],
    reactions_allergiques_aux_medicaments VARCHAR[]
);

GRANT SELECT, UPDATE ON app.medico_chirugicaux TO MEDECIN;

COMMENT ON TABLE app.medico_chirugicaux is E'@omit create,delete';
COMMENT ON COLUMN app.medico_chirugicaux.id is E'@omit update';

WITH
ins_pvt_acc AS (INSERT INTO app_private.user_account (username, password) VALUES ('a.bousmat', 'password') RETURNING id),
ins_ds_mdc AS (INSERT INTO app.dossier_medical (user_id) VALUES ((SELECT id FROM ins_pvt_acc)) RETURNING id),
ins_bio AS(INSERT INTO app.biometrique (id) VALUES ((SELECT id FROM ins_ds_mdc))),
ins_atc_prs AS (INSERT INTO app.antecedents_personnelles (id) VALUES ((SELECT id FROM ins_ds_mdc))),
ins_mdc_chgc AS (INSERT INTO app.medico_chirugicaux (id) VALUES ((SELECT id FROM ins_ds_mdc)))
INSERT INTO app.user_account(user_id, email, role) VALUES ((SELECT id FROM ins_pvt_acc), 'a.bousmat@esi-sba.dz', 'MEDECIN') RETURNING user_id AS id;

WITH
ins_pvt_acc AS (INSERT INTO app_private.user_account (username, password) VALUES ('etudiant', 'password') RETURNING id),
ins_ds_mdc AS (INSERT INTO app.dossier_medical (user_id) VALUES ((SELECT id FROM ins_pvt_acc)) RETURNING id),
ins_bio AS(INSERT INTO app.biometrique (id) VALUES ((SELECT id FROM ins_ds_mdc))),
ins_atc_prs AS (INSERT INTO app.antecedents_personnelles (id) VALUES ((SELECT id FROM ins_ds_mdc))),
ins_mdc_chgc AS (INSERT INTO app.medico_chirugicaux (id) VALUES ((SELECT id FROM ins_ds_mdc)))
INSERT INTO app.user_account(user_id, email, role) VALUES ((SELECT id FROM ins_pvt_acc), 'etudiantt@esi-sba.dz', 'ETUDIANT') RETURNING user_id AS id;