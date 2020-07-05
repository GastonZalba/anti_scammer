const https = require('http');
const querystring = require('querystring');

const FakeUser = require('./FakeUser.js');

const { prepareForm, config } = require('./config.js');

const sendForm = async formData => {

    // Pantallazo de la data a enviar
    console.log(formData);

    let contentType;

    if (config.isJSON) {
        formData = JSON.stringify(formData);
        contentType = 'application/json';
    } else {
        formData = querystring.stringify(formData);
        contentType = 'application/x-www-form-urlencoded';
    }

    let options = {
        hostname: config.hostname,
        path: config.path,
        port: config.port,
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': contentType,
            'Content-Length': formData.length
        }
    }

    return new Promise((resolve, reject) => {

        const req = https.request(options, (res) => {

            let status = res.statusCode;

            let headers = res.headers;

            console.log('Estado:', status);
            console.log('Headers:', headers);

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

            // Revisar constructor de la clase para ver todos las propiedades existentes
            let user = new FakeUser();

            let form = prepareForm(user);

            let send = await sendForm(form);

            console.log('Envío Nº:', i + 1);

        }

        console.log('Envío terminado');

    } catch (err) {
        console.log('Envío falló');
        console.error(err);
    }

})()

