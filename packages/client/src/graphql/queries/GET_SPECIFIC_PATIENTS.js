import { gql } from '@apollo/client';

const GET_SPECIFIC_PATIENTS = gql`
    query GetPecificPatients($role: Role!) {
        allUserAccounts(condition: { role: $role }) {
            nodes {
                id
                nom
                prenom
            }
        }
        currentUser {
            nom
            prenom
        }
        completedDossierMedicalsCounter(role: $role) {
            completed
            notCompleted
        }
    }
`

export { GET_SPECIFIC_PATIENTS }