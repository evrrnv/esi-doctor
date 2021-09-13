import { gql } from '@apollo/client';

const PATIENTS_PERSONAL_INFO = gql`
    query GetPatientsPersonalInfo($id: UUID!) {
        currentUser {
            nom
            prenom
            profilePicture
        }
        userAccountById(id: $id) {
            nom
            prenom
            adresse
            telephone
            datedenaissance
            sexe
            niveau
            role
            email
            profilePicture
            familyStatus
            specialite
            dossierMedicalsByUserId {
                nodes {
                    id
                    biometriqueById {
                        taille
                        poid
                        imc
                        isCompleted
                    }
                    antecedentsPersonnelleById {
                        fumer
                        jouresDeCigarattes
                        chiquer
                        prise
                        alcool
                        medicaments
                        autres
                        isCompleted
                    }
                    antecedentsMedicoChirugicauxById {
                        affectionsCongenitales
                	    isCompleted
                    }
                }
            }
        }
    }
`

export { PATIENTS_PERSONAL_INFO }