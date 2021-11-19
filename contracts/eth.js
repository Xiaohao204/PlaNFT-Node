const Ethers = require("ethers")
const erc721_ABI = require("./erc721.json").abi
const config = require("../config/constants");

const provider = undefined;
const eth = {};
const contracts = {};

async function connContract(address, abi) {
    return contracts[address] === undefined ? new Ethers.Contract(address, abi, await eth.getProvider()) : contracts[address]
}

eth.getProvider = async function () {
    return provider === undefined ? new Ethers.providers.JsonRpcProvider(config.network) : provider;
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

module.exports = eth;





