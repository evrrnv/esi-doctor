import { gql } from '@apollo/client';

const GET_DEMENDES_RDV = gql`
    query GetDemendesRdv {
        allRendezVous(orderBy: [UPDATED_AT_DESC], condition: { isValid: false }) {
            nodes {
                id
                startDate
                endDate
                isValid
                userAccountByUserId {
                    nom
                    prenom
                    role
                    profilePicture
                    niveau
                    specialite
                    groupe
                }
            }
        }
    }
`

export { GET_DEMENDES_RDV }