module.exports = {
    db: {
        connectionLimit: 100,
        host: 'localhost',
        user: 'icms',
        password: 'JWuWxh9BrPrfdVgM6gxSiMNJk64RKU',
        database: 'icms',
    },
    host: {
        port: 45628,
        webCorsOptions: {
            origin: 'https://www.nl-insu.com'
        },
        adminCorsOption: {
            origin: 'https://admin.nl-insu.com'
        }
    }
};
