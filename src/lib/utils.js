module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
        return age;
    },

    date(timestamp) {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
        return {
            day,
            month,
            year,
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    },

    level(education) {
        if (education == "Médio") {
            return "Ensino Médio Completo";
        } else if (education == "Superior") {
            return "Ensino Superior Completo";
        } else if (education == "Mestrado") {
            return "Mestrado";
        } else if (education == "Doutorado") {
            return "Doutorado";
        }
    },

    grade(year) {
        if (year == "5") {
            return "5º Ano do Ensino Fundamental"
        } else if (year == "6") {
            return "6º Ano do Ensino Fundamental"
        } else if (year == "7") {
            return "7º Ano do Ensino Fundamental"
        } else if (year == "8") {
            return "8º Ano do Ensino Fundamental"
        } else if (year == "9") {
            return "9º Ano do Ensino Fundamental"
        } else if (year == "1") {
            return "1º Ano do Ensino Médio"
        } else if (year == "2") {
            return "2º Ano do Ensino Médio"
        } else if (year == "3") {
            return "3º Ano do Ensino Médio"
        } else {
            return year
        }
    },

    reverseGrade(year) {
        if ( year == "5º Ano do Ensino Fundamental") {
            return 5
        } else if (year == "6º Ano do Ensino Fundamental") {
            return 6
        } else if (year == "7º Ano do Ensino Fundamental") {
            return 7
        } else if ( year == "8º Ano do Ensino Fundamental") {
            return 8
        } else if ( year == "9º Ano do Ensino Fundamental") {
            return 9
        } else if ( year == "1º Ano do Ensino Médio") {
            return 1
        } else if ( year == "2º Ano do Ensino Médio") {
            return 2
        } else if ( year == "3º Ano do Ensino Médio") {
            return 3
        } else {
            return year
        }
    }
}