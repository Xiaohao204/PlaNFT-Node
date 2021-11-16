module.exports = {
    network: "https://rinkeby.infura.io/v3/25b55e1839df4d1b977c62bf7b0f35ab",
    eth_contract: {
        Pla_TNFT: "0x3c4AbE3bF4b15046e5DaF238af0bc4d5B7E75463"
    },
    event_topics: {
        Pla_TNFT: {
            Transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            TransferWithIndex: "0x1ff5c586b8a5bb886c69a192872e9ead049f086dc1a3700f1fb667c9f76d3c3d",
        }
    },
    startNumber: 9628347,
    max_scan: 5000
}

