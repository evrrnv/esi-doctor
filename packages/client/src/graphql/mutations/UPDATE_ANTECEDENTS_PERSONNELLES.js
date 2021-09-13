import { gql } from '@apollo/client';

const UPDATE_ANTECEDENTS_PERSONNELLES = gql`
    mutation UpdateAntecedentsPersonnelles($id: UUID!, $data: AntecedentsPersonnellePatch!) {
        updateAntecedentsPersonnelleById(input: {
            id: $id,
            antecedentsPersonnellePatch: $data
        }) {
            antecedentsPersonnelle {
                fumer
                jouresDeCigarattes
                chiquer
                prise
                alcool
                medicaments
                autres
                isCompleted
            }
        }
    }
`

export { UPDATE_ANTECEDENTS_PERSONNELLES }