import { gql } from '@apollo/client'

const CREATE_RENDEZ_VOUS_INDIV = gql`
  mutation createRendezVousIndv($data: RendezVousInput!) {
    createRendezVous(input: { rendezVous: $data }) {
      rendezVous {
        id
        startDate
        endDate
        description
      }
    }
  }
`

export { CREATE_RENDEZ_VOUS_INDIV }
