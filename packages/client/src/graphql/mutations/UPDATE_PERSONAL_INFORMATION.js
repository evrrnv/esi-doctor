import { gql } from '@apollo/client';

const UPDATE_PERSONAL_INFORMATION = gql`
mutation UpdatePersonalInformation($id: UUID!, $data: UserAccountPatch!) {
  updateUserAccountById(input: { id: $id, userAccountPatch: $data }) {
    userAccount {
      nom
      prenom
      adresse
      telephone
      datedenaissance
      sexe
      niveau
      role
      email
      profilePicture
      familyStatus
      specialite
      dossierMedicalsByUserId {
          nodes {
            id
            biometriqueById {
              taille
              poid
              imc
              isCompleted
            }
            antecedentsPersonnelleById {
                fumer
                jouresDeCigarattes
                chiquer
                prise
                alcool
                medicaments
                autres
                isCompleted
            }
            antecedentsMedicoChirugicauxById {
                affectionsCongenitales
                isCompleted
            }
          }
      }
    }
  }
}
`

export { UPDATE_PERSONAL_INFORMATION }