let mockupForm = require('./data/mockupForm.json');

const config = {
    "hostname": 'provincia-home-ar.com',
    "path": '/login.php?p=login',
    "port": 80
}

/**
 * Description. Modificar estos datos según requiera el mockup
 * 
 * @param {Object}  user 
 * @param {String}  user.dni
 * @param {String}  user.email
 * @param {String}  user.password
 * @param {String}  user.gender
 * @param {String}  user.username
 * @param {String}  user.name
 * @param {String}  user.lastname
 * @param {String}  user.fullname
 * @param {Int}     user.codigoSeguridad
 * 
 * @return {Object} Formulario base completado con la data de un nuevo usuario
 */
const prepareForm = (user) => {

    let form = Object.assign({}, mockupForm);

    form.docNumber = user.dni;
    form.nickname = user.username;
    form.gender = (user.gender === 'M') ? 'Masculino' : 'Femenino';
    form.password = user.password;

    return form;
}

module.exports = {
    prepareForm,
    config
};
