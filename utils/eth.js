const Ethers = require("ethers")
const erc721_ABI = require("../contracts/erc721.json").abi

const eth = {};
let provider = undefined;
let contracts = {};
async function connTransferContract(address, abi) {
    if (contracts[address] === undefined) {
        contracts[address] = new Ethers.Contract(address, abi, provider);
    }
    return contracts[address]
}

eth.getProvider = async function (network) {
    if (provider === undefined) {
        provider = new Ethers.providers.JsonRpcProvider(network);
    }
    return provider;
}

eth.instanceContracts = async function (contractAddress) {
    return await connTransferContract(contractAddress, erc721_ABI);
}

module.exports = eth;





