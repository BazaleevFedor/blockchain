module.exports = {
    networks: {
        ganache: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
            chain_id: 1337
        }
    },
    compilers: {
        solc: {
            version: "0.8.19"
        }
    }
};

