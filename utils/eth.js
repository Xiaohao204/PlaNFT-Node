const Ethers = require("ethers")
const erc721_ABI = require("../contracts/erc721.json").abi
const constants = require("../config/constants");

let provider = undefined;
const eth = {};
let contracts = {};
let index = 0;
let flip = false;

async function connContract(address, abi) {
    return contracts[address] === undefined ? new Ethers.Contract(address, abi, await eth.getProvider()) : contracts[address]
}

eth.getProvider = async function () {
    return provider === undefined ? new Ethers.providers.JsonRpcProvider(constants.network[index]) : provider;
}

eth.instanceTransferContracts = async function (contracts) {
    const transferList = [];
    await Promise.all(contracts.map(async (contract) => {
        const connContractInfo = await connContract(contract, erc721_ABI);
        transferList.push(connContractInfo);
    }));
    return transferList;
}

eth.instanceSetTokenURIContracts = async function (contracts) {
    const setTokenURIList = [];
    await Promise.all(contracts.map(async (contract) => {
        const connContractInfo = await connContract(contract, erc721_ABI);
        setTokenURIList.push(connContractInfo);
    }));
    return setTokenURIList;
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
        if (index < constants.network.length - 1) index++;
        else {
            flip = !flip;
            index--
        }
    }
    provider = new Ethers.providers.JsonRpcProvider(constants.network[index])
    return provider;
}

module.exports = eth;





