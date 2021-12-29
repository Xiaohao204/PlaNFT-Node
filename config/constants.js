module.exports = {
    ETH: {
        network: [
            // "https://apis.ankr.com/3bbbc588da014966a07c359568e245dd/66a8bc6c1da7d8668848b016d04675e9/eth/fast/rinkeby",
            "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
            // "https://apis.ankr.com/9739fdf5ca9748048f7849270e20996d/ab385843c38b63c38a32cb2db58d439b/eth/fast/rinkeby"
            // "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/eth/rinkeby",
            // "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/eth/rinkeby",
            // "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/eth/rinkeby",
            // "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/eth/rinkeby",
            // "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/eth/rinkeby",
            // "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/eth/rinkeby"
        ],
        chain_symbol: 'ETH',
    },
    BSC: {
        network: [
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
            // "https://apis.ankr.com/2e648929ed5e48abb5161629f686c0ad/66a8bc6c1da7d8668848b016d04675e9/binance/full/test",
            // "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/bsc/testnet",
            // "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/bsc/testnet",
            // "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/bsc/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/bsc/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/bsc/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/bsc/testnet"
        ],
        chain_symbol: 'BSC',
    },
    POLYGON: {
        network: [
            "https://rpc-mumbai.maticvigil.com/"
            // "https://apis.ankr.com/3f42748eae2048929de50dc32a008b62/66a8bc6c1da7d8668848b016d04675e9/polygon/full/test",
            // "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/polygon/mumbai",
            // "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/polygon/mumbai",
            // "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/polygon/mumbai",
            // "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/polygon/mumbai",
            // "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/polygon/mumbai",
            // "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/polygon/mumbai"
        ],
        chain_symbol: 'POLYGON',
    },
    ARBITRUM: {
        network: [
            "https://rinkeby.arbitrum.io/rpc"
            // "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/arbitrum/testnet",
            // "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/arbitrum/testnet",
            // "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/arbitrum/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/arbitrum/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/arbitrum/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/arbitrum/testnet"
            // "https://apis.ankr.com/05ea94119be042ac86c261d195eef823/66a8bc6c1da7d8668848b016d04675e9/arbitrum/full/test"
        ],
        chain_symbol: 'ARBITRUM',
    },
    FANTOM: {
        network: [
            "https://rpc.testnet.fantom.network/"
        ],
        chain_symbol: 'FANTOM',
    },
    AVAX: {
        network: [
            "https://api.avax-test.network/ext/bc/C/rpc"
            // "https://speedy-nodes-nyc.moralis.io/cd647532dcdc3ae204954045/avalanche/testnet",
            // "https://speedy-nodes-nyc.moralis.io/2b63b620cc2e2abc12e05a38/avalanche/testnet",
            // "https://speedy-nodes-nyc.moralis.io/4d5489941eb87ba0e290c179/avalanche/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6729fc0fc0c3d8a7f6ee4b00/avalanche/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6d256ae54483df82a3782391/avalanche/testnet",
            // "https://speedy-nodes-nyc.moralis.io/6bd8d0732c1d9c3760f1d506/avalanche/testnet"
        ],
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