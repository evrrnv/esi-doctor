import { gql } from '@apollo/client'

const CREATE_RENDEZ_VOUS_INDIV = gql`
  mutation CreateRendezVousIndv($data: CreateRendezVousInput!) {
    createRendezVous(input: { rendezVous: $data })
  }
`

export { CREATE_RENDEZ_VOUS_INDIV }
