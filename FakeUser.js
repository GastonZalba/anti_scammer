// https://forebears.io/argentina/surnames
const apellidos = require('./data/apellidos.json');

// http://registrocivilonline.cba.gov.ar/Paginas/Listado%20de%20Nombres%20permitidos.pdf
const nombres = require('./data/nombres.json');

class FakeUser {

    constructor() {

        let nameGender = this.generateNameGender();

        this.name = nameGender.name;
        this.gender = nameGender.gender;
        this.lastname = this.generateLastname();
        this.fullname = this.name + ' ' + this.lastname;

        this.dni = this.generateDni(/*min =*/ 8000000, /*max =*/ 70000000 );

        this.password = this.generatePassword( /*min =*/ 6, /*max =*/ 12);

        this.username = this.generateUserName();

        // Pasamos de vuelta el generador de username para tener más random de datos
        // y no sólo el username con el domino anezado
        this.email = this.generateEmail(this.generateUserName());

        this.codigoSeguridad = this.generateCodSeg();

    }

    generateCodSeg() {
        return formatNumberLength(randomNumber(0, 999), 3);
    }

    generateUserName() {

        let type = randomNumber(1, 7);
        let name = this.name.toLowerCase().replace(/\s/g, '');
        let lastname = this.lastname.toLowerCase().replace(/\s/g, '');

        switch (type) {
            case 1:
                return name + '_' + randomNumber(1940, 2002);
            case 2:
                return name + '.' + lastname;
            case 3:
                return lastname + '.' + name;
            case 4:
                return lastname + randomNumber(1940, 2002);
            case 5:
                return randomNumber(0, 80) + name;
            case 6:
                return name;
            case 7:
                return this.dni;
        }

    }


    generateDni(min = 8000000, max = 70000000) {
        let num = randomNumber(min, max);
        let sNum = formatNumberLength(num, 8);
        return sNum;
    }

    generatePassword(min = 6, max = 12) {
        let length = randomNumber(min, max);
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    generateEmail(name) {
        let domains = [
            'yahoo.com',
            'yahoo.com.ar',
            'gmail.com',
            'outlook.com',
            'hotmail.com'
        ]

        let domain = domains[randomNumber(0, 4)];
        let email = name.toLowerCase() + '@' + domain;

        return email;
    }

    generateNameGender() {
        return nombres[randomNumber(0, nombres.length - 1)];
    }

    generateLastname() {
        return apellidos[randomNumber(0, apellidos.length - 1)];
    }

}

const randomNumber = (min = 0, max = 10) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const formatNumberLength = (num, length) => {
    let r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

module.exports = FakeUser;