const Ethers = require("ethers")
const web3 = require("web3")
const erc721_ABI = require("../contracts/erc721.json").abi

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

module.exports = eth;





