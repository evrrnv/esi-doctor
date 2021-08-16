CREATE EXTENSION "uuid-ossp";

CREATE TYPE SEXE AS ENUM ('M', 'F');

CREATE TYPE SPECIALITE AS ENUM ('SIW', 'ISI');

CREATE TYPE ROLE AS ENUM ('ETUDIANT', 'MEDECIN', 'ENSEIGNANT', 'ATS');

CREATE TABLE public.users (
	id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_id varchar,
    username varchar NOT NULL UNIQUE,
    password varchar,
    role ROLE DEFAULT 'ETUDIANT',
	email varchar UNIQUE,
	nom varchar,
	prenom varchar,
    dateDeNaissance DATE,
    sexe SEXE,
    niveau  INT CHECK (niveau >= 1 and niveau <= 5),
    specialite SPECIALITE,
    adresse varchar,
    telephone char(10),
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);

INSERT INTO public.users (username, email, password) VALUES ('a.bousmat', 'a.bousmat@esi-sba.dz', 'password');