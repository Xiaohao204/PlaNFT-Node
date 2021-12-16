const Ethers = require("ethers")
const erc721_ABI = require("../contracts/erc721.json").abi
const constants = require("../config/constants");

let provider = undefined;
const eth = {};
let contracts = {};
let index = 0;
let flip = false;
const apiList = constants.network.ETH;
async function connTransferContract(address, abi) {
    if (contracts[address] === undefined) {
        contracts[address] = new Ethers.Contract(address, abi, await eth.getProvider());
    }
    return contracts[address]
}

eth.getProvider = async function () {
    if (provider === undefined) {
        provider = new Ethers.providers.JsonRpcProvider(apiList[index]);
    }
    return provider;
}

eth.instanceContracts = async function (contractAddress) {
    return await connTransferContract(contractAddress, erc721_ABI);
}

eth.getBlockTime = async function (blockHash) {
    const providerNow = await eth.getProvider();
    const res = await providerNow.getBlock(blockHash);
    return res.timestamp * 1000;
}

eth.updateProvider = async function () {
    if (flip) {
        if (index > 0) index--;
        else {
            flip = !flip;
            index++
        }
    } else {
        if (index < apiList.length - 1) index++;
        else {
            flip = !flip;
            index--
        }
    }
    provider = new Ethers.providers.JsonRpcProvider(apiList[index])
    return provider;
}

module.exports = eth;





