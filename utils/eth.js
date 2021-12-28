const Ethers = require("ethers")
const erc721_ABI = require("../contracts/erc721.json").abi

const eth = {};
let provider = undefined;
let contracts = {};
let network = undefined;

eth.setNetwork = function (newNetwork) {
    network = newNetwork;
}

eth.getProvider = async function () {
    return provider === undefined ? new Ethers.providers.JsonRpcProvider(network) : provider;
}

eth.connContract = async function (address) {
    if (contracts[address] === undefined) {
        contracts[address] = new Ethers.Contract(address, erc721_ABI, await eth.getProvider());
    }
    return contracts[address]
}

eth.getBlockTime = async function (blockHash) {
    const providerNow = await eth.getProvider();
    const res = await providerNow.getBlock(blockHash);
    return res.timestamp * 1000;
}

module.exports = eth;





