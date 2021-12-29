module.exports = {
    ETH: {
        // network: "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/eth/mainnet",
        network: "http://10.0.0.89:18545/",
        chain_symbol: 'ETH',
    },
    BSC: {
        network: "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/bsc/testnet",
        chain_symbol: 'BSC',
    },
    POLYGON: {
        network: "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/polygon/mumbai",
        chain_symbol: 'POLYGON',
    },
    ARBITRUM: {
        network: "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/arbitrum/testnet",
        chain_symbol: 'ARBITRUM',
    },
    FANTOM: {
        network: "https://rpc.testnet.fantom.network/",
        chain_symbol: 'FANTOM',
    },
    AVAX: {
        network: "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/avalanche/testnet",
        chain_symbol: 'AVAX',
    },
    AURORA: {
        network: "https://testnet.aurora.dev",
        chain_symbol: 'AURORA',
    },
    ipfs: {
        main: "https://ipfs.io/ipfs/",
        test: "https://dweb.link/ipfs/",
    },
    event_topics: {
        ERC721: {
            Transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            SetTokenURI: "0xd2d827dddfc9c9a02afc5fc68d3251684b36e213a7999ebd90a861f25df4077e"
        }
    },
    sourceType: {
        chain: 0,
        database: 1
    },
    max_scan: 50,
}