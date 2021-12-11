const Ethers = require("ethers")
const erc721_ABI = require("../contracts/erc721.json").abi
const constants = require("../config/constants");

let provider = undefined;
const eth = {};
let transferContracts = {};
let setTokenURIContracts = {};
let index = 0;
let flip = false;

async function connTransferContract(address, abi) {
    if (transferContracts[address] === undefined) {
        transferContracts[address] = new Ethers.Contract(address, abi, await eth.getProvider());
    }
    return transferContracts[address]
}

async function connSetTokenURIContract(address, abi) {
    if (setTokenURIContracts[address] === undefined) {
        setTokenURIContracts[address] = new Ethers.Contract(address, abi, await eth.getProvider());
    }
    return setTokenURIContracts[address]
}

eth.getProvider = async function () {
    return provider === undefined ? new Ethers.providers.JsonRpcProvider(constants.network[index]) : provider;
}

eth.instanceTransferContracts = async function (contracts) {
    const transferList = [];
    if (contracts != undefined) {
        await Promise.all(contracts.map(async (contract) => {
            const connContractInfo = await connTransferContract(contract, erc721_ABI);
            transferList.push(connContractInfo);
        }));
    }
    return transferList;
}

eth.instanceSetTokenURIContracts = async function (contracts) {
    const setTokenURIList = [];
    if (contracts != undefined) {
        await Promise.all(contracts.map(async (contract) => {
            const connContractInfo = await connSetTokenURIContract(contract, erc721_ABI);
            setTokenURIList.push(connContractInfo);
        }));
    }
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





