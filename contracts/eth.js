const Ethers = require("ethers")
const ExchangeABI = require("./exchange.json")
const config = require("../config/constants");

const ExchangeContract = undefined;
const provider = undefined;
const eth = {};

async function connContract(address, abi) {
    return new Ethers.Contract(address, abi, await eth.getProvider());
}

eth.getProvider = async function () {
    return provider === undefined ? new Ethers.providers.JsonRpcProvider(config.network) : provider;
}

eth.exchange_contract = async function () {
    return ExchangeContract === undefined ? connContract(config.eth_contract.plaNFTExchange, ExchangeABI) : ExchangeContract;
}

eth.getBlockTime = async function (blockHash) {
    const providerNow = await eth.getProvider();
    const res = await providerNow.getBlock(blockHash);
    return res.timestamp * 1000;
}

module.exports = eth;





