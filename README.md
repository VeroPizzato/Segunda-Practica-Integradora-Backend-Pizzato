Para probar el login con github se debe crear dentro de la carpeta src/config el archivo github.private.js con las credenciales appId, clientID, clientSecret y callbackURL.

El archivo github.private.js con mis datos de conexion a github es:

module.exports = {
    appId: '886437',
    clientID: 'Iv1.837ae01fd44b8a61',
    clientSecret: '784b9c69e2df7340400973f0aafb7cdbf7f2d843',
    callbackURL: "http://localhost:8080/api/sessions/githubcallback"
}
