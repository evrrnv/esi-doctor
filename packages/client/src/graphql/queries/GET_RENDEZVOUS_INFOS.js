import { gql } from '@apollo/client'

const GET_STUDENT_ALL_INFOS = gql`
  query MyQuery {
    allUserAccounts(condition: { role: ETUDIANT }) {
      nodes {
        id
        email
        nom
        prenom
      }
    }
  }
`

export { GET_STUDENT_ALL_INFOS }
