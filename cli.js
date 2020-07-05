const https = require('http');
const querystring = require('querystring');

const FakeUser = require('./FakeUser.js');
// Mockup de datos que espera el server
let mockupForm = require('./data/mockupForm.json');


const HOSTNAME = 'provincia-home-ar.com';
const PATH = '/login.php?p=login';


const prepareForm = () => {
    
    let form = Object.assign({}, mockupForm);

    // Revisar constructor de la clase para ver todos las propiedades existentes
    let user = new FakeUser();

    // Modificar estos datos según requiera el mockup
    form.docNumber = user.dni;
    form.nickname = user.username;
    form.gender = (user.gender === 'M') ? 'Masculino' : 'Femenino';
    form.password = user.password;

    return form;
}


const sendForm = async formData => {

    // Pantallazo de la data a enviar
    console.log(formData);

    formData = querystring.stringify(formData);

    let options = {
        hostname: HOSTNAME,
        path: PATH,
        port: 80,
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json',
            'Content-Length': formData.length
        }
    }

    return new Promise((resolve, reject) => {

        const req = https.request(options, (res) => {

            console.log('Enviando.', 'Estado:', res.statusCode);

            res.setEncoding('utf8');
            res.on('data', (data) => {
                //console.log(data.toString());
                resolve();
            });
        })

        req.on('error', (err) => {
            console.log(err)
            reject(err.message);
        });

        req.write(formData);
        req.end();

    }).catch(err => {
        throw new Error(err.message);
    })

}

// Argumentos pasados vía cli
const args = process.argv.slice(2);
const sendNumber = args[0] || 10000;

(async function process() {

    try {

        for (let i = 0; i < sendNumber; i++) {
           
            let form = prepareForm();

            let send = await sendForm(form);

            console.log('Envío Nº:', i+1, HOSTNAME + PATH);

        }

        console.log('Envío terminado');

    } catch (err) {
        console.log('Envío falló');
        console.error(err.message);
    }

})()

