import { gql } from '@apollo/client';

const VALIDATE_RDV = gql`
mutation ValidateRdv($id: UUID!, $isValid: Boolean) {
  updateRendezVousById(
    input: { id: $id, rendezVousPatch: { isValid: $isValid } }
  ) {
    rendezVous {
      id
    }
  }
}
`

export { VALIDATE_RDV }