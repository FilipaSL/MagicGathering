module.exports = {
    port: process.env.PORT,
    local_client_app: process.env.LOCAL_CLIENT_APP,
    allowedDomains: [
        process.env.LOCAL_CLIENT_APP,
        process.env.LOCAL_SERVER_API
    ]
}
