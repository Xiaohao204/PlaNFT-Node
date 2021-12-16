module.exports = {
    network: [
        // "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/polygon/mumbai"
        "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/eth/rinkeby"
    ],
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
    chain_symbol: {
        BSC: 'BSC',
        ETH: 'ETH',
        POLYGON: 'POLYGON',
        ARBITRUM: 'ARBITRUM',
        FANTOM: 'FANTOM',
        AVAX: 'AVAX',
        AURORA: 'AURORA'
    },
    max_scan: 10,
}