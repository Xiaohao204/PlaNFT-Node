const Ethers = require("ethers")
const web3 = require("web3")
const erc721_ABI = require("../contracts/erc721.json").abi
const exchange_ABI = require("../contracts/exchange.json").abi

const eth = {};
let provider = undefined;
let contracts = {};

eth.getProvider = async function (newNetwork) {
    if (provider === undefined) {
        provider = new Ethers.providers.Web3Provider(new web3.providers.HttpProvider(newNetwork));
    }
    return provider;
}

eth.connContract = async function (address) {
    if (contracts[address] === undefined) {
        contracts[address] = new Ethers.Contract(address, erc721_ABI, provider);
    }
    return contracts[address]
}

async function connTransferContract(address, abi) {
    if (contracts[address] === undefined) {
        contracts[address] = new Ethers.Contract(address, abi, provider);
    }
    return contracts[address]
}

async function connExchangeContract(address, abi) {
    if (contracts[address] === undefined) {
        contracts[address] = new Ethers.Contract(address, abi, provider);
    }
    return contracts[address]
}

eth.instanceContracts = async function (contractAddress) {
    return await connTransferContract(contractAddress, erc721_ABI);
}

eth.instanceExchangeContracts = async function (contractAddress) {
    return await connExchangeContract(contractAddress, exchange_ABI);
}

module.exports = eth;





