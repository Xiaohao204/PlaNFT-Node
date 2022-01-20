module.exports = {
    ETH: {
        network: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        chain_symbol: 'ETH',
        contractList: [
            '0x3ee19f477FF16135aeFEA199c238Ded59d065Fd2',
            '0x8a099fC80cBba4613484219892eb948bA6D23F86',
            '0xBC19157DfeFa18bAb7AF96d020a6f05bAcD8953C'
        ]
    },
    BSC: {
        network: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        chain_symbol: 'BSC',
        contractList: [
            '0x3ee19f477FF16135aeFEA199c238Ded59d065Fd2',
            '0x8a099fC80cBba4613484219892eb948bA6D23F86',
            '0xBC19157DfeFa18bAb7AF96d020a6f05bAcD8953C'
        ]
    },
    POLYGON: {
        network: "https://rpc-mumbai.maticvigil.com/",
        chain_symbol: 'POLYGON',
        contractList: [
            '0x3ee19f477FF16135aeFEA199c238Ded59d065Fd2',
            '0x8a099fC80cBba4613484219892eb948bA6D23F86',
            '0xBC19157DfeFa18bAb7AF96d020a6f05bAcD8953C'
        ]
    },
    ARBITRUM: {
        network: "https://rinkeby.arbitrum.io/rpc",
        chain_symbol: 'ARBITRUM',
        contractList: [
            '0x3ee19f477FF16135aeFEA199c238Ded59d065Fd2',
            '0x8a099fC80cBba4613484219892eb948bA6D23F86',
            '0xBC19157DfeFa18bAb7AF96d020a6f05bAcD8953C'
        ]
    },
    FANTOM: {
        network: "https://rpc.testnet.fantom.network/",
        chain_symbol: 'FANTOM',
        contractList: [
            '0x3ee19f477FF16135aeFEA199c238Ded59d065Fd2',
            '0x8a099fC80cBba4613484219892eb948bA6D23F86',
            '0xBC19157DfeFa18bAb7AF96d020a6f05bAcD8953C'
        ]
    },
    AVAX: {
        network: "https://api.avax-test.network/ext/bc/C/rpc",
        chain_symbol: 'AVAX',
        contractList: [
            '0x3ee19f477FF16135aeFEA199c238Ded59d065Fd2',
            '0x8a099fC80cBba4613484219892eb948bA6D23F86',
            '0xBC19157DfeFa18bAb7AF96d020a6f05bAcD8953C'
        ]
    },
    AURORA: {
        network: "https://testnet.aurora.dev",
        chain_symbol: 'AURORA',
        contractList: [
            '0x3ee19f477FF16135aeFEA199c238Ded59d065Fd2',
            '0x8a099fC80cBba4613484219892eb948bA6D23F86',
            '0xBC19157DfeFa18bAb7AF96d020a6f05bAcD8953C'
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
        },
        Exchange: {
            AtomicMatch: "0x83517c79fd30b597c1e067b1580b3888ee68d8bcceac8273414d1c741ce3e2a2"
        }
    },
    sourceType: {
        chain: 0,
        database: 1
    },
    max_scan: 50,
    telegram: {
        userName: 'BoHaos',
        host: 'test.planft.com'
    }
}