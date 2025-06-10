module.exports = {
    networks: {
        development: {
            host: "127.0.0.1", // Ganache
            port: 7545,
            network_id: "*" // любой ID
        }
    },
    compilers: {
        solc: {
            version: "0.8.20"
        }
    }
};
