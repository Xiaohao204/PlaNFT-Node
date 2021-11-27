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

eth.all_contracts = async function (contracts) {
    const contractList = [];//定义合约数组通过循环获取合约信息集合
    await Promise.all(contracts.map(async (contract) => {
        const connContractInfo = await connContract(contract, erc721_ABI);
        contractList.push(connContractInfo);
    }));
    return contractList;
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





