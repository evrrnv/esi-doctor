import { gql } from '@apollo/client'

const UPDATE_BIOMETRIQUE = gql`
  mutation UpdateBiometrique($id: UUID!, $data: CreateRendezVousInput!) {
    updateBiometriqueById(input: { id: $id, biometriquePatch: $data }) {
      biometrique {
        taille
        poid
        imc
        isCompleted
      }
    }
  }
`

export { UPDATE_BIOMETRIQUE }
