import { gql } from '@apollo/client';

const CACHED_CURRENT_USER = gql`
    query GetCurrnetUserFromCache {
        currentUser {
            nom
            prenom
        }
    }
`

export { CACHED_CURRENT_USER }