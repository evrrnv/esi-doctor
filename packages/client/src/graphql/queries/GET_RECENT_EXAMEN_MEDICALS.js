import { gql } from '@apollo/client';

const GET_RECENT_EXAMEN_MEDICALS = gql`
query ExamenMedicalsHistory($search: String!) {
  recentExamenMedicals(
    filter: {
      or: [
        { nom: { includesInsensitive: $search } }
        { prenom: { includesInsensitive: $search } }
      ]
    }
  ) {
    nodes {
      nom
      prenom
      profilePicture
      role
      examenId
      userId
      lastEdit
    }
  }
}
`

export { GET_RECENT_EXAMEN_MEDICALS }