import { gql } from '@apollo/client';

const UPDATE_PEAU_MUQUEUSES = gql`
mutation UpdatePeauEtMuqueus($id: UUID!, $data: PeauEtMuqueusPatch!) {
  updatePeauEtMuqueusById(input: {
    id: $id,
    peauEtMuqueusPatch: $data
  }) {
    peauEtMuqueus {
      notes
    }
  }
}
`

const UPDATE_OPHTALMOLOGIQUE = gql`
mutation UpdateOphtalmologique($id: UUID!, $data: OphtalmologiquePatch!) {
  updateOphtalmologiqueById(input: {
    id: $id,
    ophtalmologiquePatch: $data
  }) {
    ophtalmologique {
      notes
    }
  }
}
`

const UPDATE_RAPPORT = gql`
mutation UpdateRapport($id: UUID!, $data: RapportMedicalPatch!) {
  updateRapportMedicalById(input: {
    id: $id,
    rapportMedicalPatch: $data
  }) {
    rapportMedical {
      notes
    }
  }
}
`

export { UPDATE_PEAU_MUQUEUSES, UPDATE_OPHTALMOLOGIQUE, UPDATE_RAPPORT }