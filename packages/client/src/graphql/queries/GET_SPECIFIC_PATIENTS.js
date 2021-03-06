import { gql } from '@apollo/client';

const GET_SPECIFIC_PATIENTS = gql`
    query GetPecificPatients($role: Role!) {
        allUserAccounts(condition: { role: $role }) {
            nodes {
                id
                nom
                prenom
                profilePicture
                role
                dossierMedicalsByUserId {
                    nodes {
                        id
                    }
                }
            }
        }
        currentUser {
            nom
            prenom
            profilePicture
        }
        completedDossierMedicalsCounter(role: $role) {
            completed
            notCompleted
        }
    }
`

export { GET_SPECIFIC_PATIENTS }