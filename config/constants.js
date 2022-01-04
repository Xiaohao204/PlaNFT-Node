module.exports = {
    ETH: {
        // network: "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/eth/mainnet",
        network: "http://10.0.0.89:18545/",
        // network: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        chain_symbol: 'ETH',
    },
    BSC: {
        network: "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/bsc/testnet",
        chain_symbol: 'BSC',
    },
    POLYGON: {
        network: "https://planft:Planft20211231@apis.ankr.com/8e2edc9e5f9f494287e7aab41f22458a/46d7ea6c80dc52f7d19bf60d4c4158c9/polygon/full/main",
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