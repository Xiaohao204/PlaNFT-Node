module.exports = {
    network: [
        "https://rinkeby.infura.io/v3/25b55e1839df4d1b977c62bf7b0f35ab",
        "https://rinkeby.infura.io/v3/3d1c157ad26247b3bd2b9ae1762b7a05",
        "https://rinkeby.infura.io/v3/9e9c5fffb76d44e2bfcd3c6fcfa903dd"
    ],
    ipfs: {
        main: "https://ipfs.io/ipfs/",
        test: "https://dweb.link/ipfs/",
    },
    event_topics: {
        ERC721: {
            Transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        }
    },
    max_scan: 5,
}

