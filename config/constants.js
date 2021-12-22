module.exports = {
    network: {
        ETH: [
            "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/eth/rinkeby",
            "https://rinkeby.infura.io/v3/25b55e1839df4d1b977c62bf7b0f35ab",
            "https://rinkeby.infura.io/v3/3d1c157ad26247b3bd2b9ae1762b7a05",
            "https://rinkeby.infura.io/v3/9e9c5fffb76d44e2bfcd3c6fcfa903dd",
            "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/eth/rinkeby",
            "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/eth/rinkeby",
            "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/eth/rinkeby",
            "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/eth/rinkeby",
            "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/eth/rinkeby"
        ],
        BSC: [
            "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/bsc/testnet",
            "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/bsc/testnet",
            "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/bsc/testnet",
            "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/bsc/testnet",
            "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/bsc/testnet",
            "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/bsc/testnet"
        ],
        POLYGON: [
            "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/polygon/mumbai",
            "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/polygon/mumbai",
            "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/polygon/mumbai",
            "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/polygon/mumbai",
            "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/polygon/mumbai",
            "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/polygon/mumbai"
        ],
        ARBITRUM: [
            "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/arbitrum/testnet",
            "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/arbitrum/testnet",
            "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/arbitrum/testnet",
            "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/arbitrum/testnet",
            "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/arbitrum/testnet",
            "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/arbitrum/testnet"
        ],
        FANTOM: [
            "https://rpc.testnet.fantom.network/"
        ],
        AVAX: [
            "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/avalanche/testnet",
            "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/avalanche/testnet",
            "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/avalanche/testnet",
            "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/avalanche/testnet",
            "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/avalanche/testnet",
            "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/avalanche/testnet"
        ],
        AURORA: [
            "https://testnet.aurora.dev"
        ]
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