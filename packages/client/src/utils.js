const convertDateToReadable = (date) => {
    if (date) {
        date = new Date(date)
        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ]
        return `${date.getDate()} ${monthNames[date.getMonth() - 1]} ${date.getFullYear()}`
    }
}

const readSexe = (sexe) => {
    if (sexe) {
        if (sexe === 'M') return "Mâle"
        else if (sexe === 'F') return "Femelle"
    }
}

const writeSexe = (sexe) => {
    if (sexe) {
        if (sexe === 'Mâle') return 'M'
        else if (sexe === 'F') return 'F'
    }
}

const readNiveau = (niveau, specialite) => {
    if (niveau !== null ) {
        if (niveau === 1) return "1CP"
        else if (niveau === 2) return "2CP"
        else if (niveau === 3) return "1SC"
        else if (niveau === 4) {
            if (specialite) {
                return `2SC-${specialite}`
            } else {
                return "2SC"
            }
        }
        else if (niveau === 5) {
            if (specialite) {
                return `3SC-${specialite}`
            } else {
                return "3SC"
            }
        }
    }
}

const writeNiveau = (text) => {
    let niveau, specialite
    if (text === '1CP') niveau = 1
    else if (text === '2CP') niveau = 2
    else if (text === '1SC') niveau = 3
    else if (text === '2SC-SIW') {
         niveau = 4
         specialite = 'SIW'
    }
    else if (text === '2SC-ISI') {
        niveau = 4
        specialite = 'ISI'
   }
   else if (text === '3SC-ISI') {
    niveau = 5
    specialite = 'ISI'
    }
    else if (text === '3SC-SIW') {
        niveau = 5
        specialite = 'SIW'
    }
    return { niveau, specialite }
}

const capitalizeFirstLetter = (string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }
};

const calculateAge = (birthday) => {
    if (birthday) {
        birthday = new Date(birthday)
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}

const stringToBoolean = (string) => {
    switch(string.toLowerCase().trim()) {
        case "true": return true;
        case "false": return false;
        default: return null
    }
}

export { convertDateToReadable, readSexe, readNiveau, calculateAge, capitalizeFirstLetter, writeSexe, writeNiveau, stringToBoolean }