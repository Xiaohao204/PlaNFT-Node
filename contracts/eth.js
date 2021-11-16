const Ethers = require("ethers")
const erc721_ABI = require("./erc721.json").abi
const config = require("../config/constants");

// const ZKRandomCoreContract = undefined;
const PlaTNFT_contract = undefined;
const provider = undefined;
const eth = {};

async function connContract(address, abi) {
    return new Ethers.Contract(address, abi, await eth.getProvider());
}

eth.getProvider = async function () {
    return provider === undefined ? new Ethers.providers.JsonRpcProvider(config.network) : provider;
}

// eth.ZKRandomCore_contract = async function () {
//     return ZKRandomCoreContract === undefined ? connContract(config.eth_contract.ZKRandomCore, ZKRandomCoreABI) : ZKRandomCoreContract;
// }

eth.Pla_TNFT_contract = async function () {
    return PlaTNFT_contract === undefined ? connContract(config.eth_contract.Pla_TNFT, erc721_ABI) : PlaTNFT_contract;
}

eth.other_contract = async function (contract_address) {
    return connContract(contract_address, erc721_ABI);
}

eth.getBlockTime = async function (blockHash) {
    const providerNow = await eth.getProvider();
    const res = await providerNow.getBlock(blockHash);
    return res.timestamp * 1000;
}

module.exports = eth;





