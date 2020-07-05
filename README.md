# anti_scammer

 Utilidad para enviar datos basura a sitios web que hacen suplantación de identidad ([pishing](https://es.wikipedia.org/wiki/Phishing)) que contengan formularios solicitando datos personales y bancarios. El objetivo de esta herramienta es saturar con información que se vea creíble y sea indistinguible de la real, siendo en verdad puro ruido aleatorio y artificial. Inspirado por este [video](https://www.youtube.com/watch?v=UtNYzv8gLbs).

## Uso
- Configurar el archivo mockupForm.json según los resultados que espera el formulario a replicar.
- Configurar los parámetros de la conexión y las propiedades a enviar en el archivo `config.js`.
- `node cli.js [numero_de_envios]` Por defecto se envían 10.000 formularios.
- NOTA: se pueden abrir múltiples consolas de NodeJS para enviar más peticiones en simultáneo.

### La herramienta cuenta con generadores de:
- Nombre (aleatorio desde un listado de 12.141 elementos)
- Apellido (idem, desde 1.000 elementos)
- Género (correspondiente al nombre: M | F | A)
- DNI
- Nombre de usuario (a partir del nombre, apellido y DNI)
- Direcciones de correo electrónico (a partir del nombre, apellido y DNI)
- Password
- Código de seguridad

## Todo
- Números de tarjeta de crédito
- Fecha de expiración
- Nombre Banco
- Direccion
- Ciudad
- Codigo Postal
- Provincia
- Fecha de Nacimiento