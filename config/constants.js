module.exports = {
    ETH: {
        network: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        chain_symbol: 'ETH',
    },
    BSC: {
        network: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        chain_symbol: 'BSC',
    },
    POLYGON: {
        network: "https://rpc-mumbai.maticvigil.com/",
        chain_symbol: 'POLYGON',
    },
    ARBITRUM: {
        network: "https://rinkeby.arbitrum.io/rpc",
        chain_symbol: 'ARBITRUM',
    },
    FANTOM: {
        network: [
            "https://rpc.testnet.fantom.network/"
        ],
        chain_symbol: 'FANTOM',
    },
    AVAX: {
        network: "https://api.avax-test.network/ext/bc/C/rpc",
        chain_symbol: 'AVAX',
    },
    AURORA: {
        network: [
            "https://testnet.aurora.dev"
        ],
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
    max_scan: 50,
}