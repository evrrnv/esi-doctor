import { gql } from '@apollo/client';

const GET_EXAMEN_MEDICAL = gql`
query GetExamenMedical($id: UUID!, $userId: UUID!) {
  userAccountById(id: $userId) {
    nom
    prenom
    role
    email
    profilePicture
  }
  examenMedicalById(id: $id) {
    id
    rapportMedicalById {
      notes
    }
    peauEtMuqueusById {
      notes
    }
    ophtalmologiqueById {
      notes
      larmolement
      douleurs
      tachesDevantLesYeux
    }
    orlById {
      siflements
      anginesRepetees
      expitaxis
      rhinorthee
    }
    locomoteurById {
      notes
    }
    respiratoireById {
      notes
    }
    cardioVasculaireById {
      notes
    }
    digestifById {
      notes
    }
    genitoUrinaireById {
      notes
    }
    neurologiquePsychismeById {
      notes
    }
    hematologieAnglionnaireById {
      notes
    }
    endocrinologieById {
      notes
    }
    profilePsychologiqueById {
      notes
    }
    examensComplementaireById {
      notes
    }
    orientationById {
      notes
    }
  }
}

`

export { GET_EXAMEN_MEDICAL }