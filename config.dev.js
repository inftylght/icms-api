module.exports = {
    db: {
        connectionLimit: 3,
        host: '108.160.143.87',
        user: 'icms_dev',
        password: '9a8XbMpUPPM2YnVENxEImZURq',
        database: 'icms_dev',
    },
    host: {
        port: 8080,
        webCorsOptions: {
            origin: 'http://localhost:4200'
        },
        adminCorsOption: {
            origin: 'https://localhost:4200'
        }
    },
};
