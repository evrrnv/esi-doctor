import { gql } from '@apollo/client';

const SEARCH_PATIENTS = gql`
    query SearchPatients($role: Role!, $search: String!) {
        allUserAccounts(
            filter: {
                or: [
                    { nom: { includesInsensitive: $search } },
                    { prenom: { includesInsensitive: $search } },
                    { email: { includesInsensitive: $search } }
                ]
            }
            condition: { role: $role }
        ) {
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
    }
`

export { SEARCH_PATIENTS }