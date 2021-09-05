import { gql } from '@apollo/client';

const GET_PATIENTS_LIST = gql`
    query GetPatientsList {
        recentUpdatedDossierMedicals {
            nodes {
                numero
                patientNom
                patientPrenom
                medecinNom
                medecinPrenom
                numeroDossierMedical
                partie
                date
            }
        }
        currentUser {
            nom
            prenom
        }
        patientsNumberByRole {
            nodes {
                role
                count
            }
        }
    }
`

export { GET_PATIENTS_LIST }