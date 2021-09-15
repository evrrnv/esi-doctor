import { gql } from '@apollo/client';

const CREATE_EXAMEN_MEDICAL = gql`
    mutation CreateExamenMedical($dossierMedicalId: UUID!) {
        createExamenMedical(input: {examenMedical: {
            dossierMedicalId: $dossierMedicalId
        }}) {
            examenMedical {
                id
            }
        }
    }
`

export { CREATE_EXAMEN_MEDICAL }