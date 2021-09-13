import { gql } from '@apollo/client';

const STATISTICS = gql`
    query GetStatistics($days: Int!) {
        statistics(days: $days) {
            etudiant
            enseignant
            ats
            total
            homme
            femme
        }
        allCompletedDossierMedicalsCounter {
            completed
            notCompleted
        }
        currentUser {
            nom
            prenom
            profilePicture
        }
    }
`

export { STATISTICS }