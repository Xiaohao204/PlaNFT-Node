const Ethers = require("ethers")
const erc721_ABI = require("../contracts/erc721.json").abi
const constants = require("../config/constants");

const eth = {};
let provider = {};
let contracts = {};
const apiList = constants.network.ETH;
async function connTransferContract(address, abi) {
    if (contracts[address] === undefined) {
        contracts[address] = new Ethers.Contract(address, abi, await eth.getProvider());
    }
    return contracts[address]
}

eth.getProvider = async function () {
    const index = getRandomInt(apiList.length);
    if (provider[index] === undefined) {
        provider[index] = new Ethers.providers.JsonRpcProvider(apiList[index]);
    }
    return provider[index];
}

eth.instanceContracts = async function (contractAddress) {
    return await connTransferContract(contractAddress, erc721_ABI);
}

eth.getBlockTime = async function (blockHash) {
    const providerNow = await eth.getProvider();
    const res = await providerNow.getBlock(blockHash);
    return res.timestamp * 1000;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = eth;





