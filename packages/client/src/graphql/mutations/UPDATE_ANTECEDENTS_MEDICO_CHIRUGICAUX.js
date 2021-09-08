import { gql } from '@apollo/client';

const UPDATE_ANTECEDENTS_MEDICO_CHIRUGICAUX = gql`
    mutation UpdateAntecedentsMedicoChirugicaux($id: UUID!, $data: AntecedentsMedicoChirugicauxPatch!) {
        updateAntecedentsMedicoChirugicauxById(input: {
            id: $id
            antecedentsMedicoChirugicauxPatch: $data
        }) {
            antecedentsMedicoChirugicaux {
                affectionsCongenitales
                isCompleted
            }
        }
    }
`

export { UPDATE_ANTECEDENTS_MEDICO_CHIRUGICAUX }