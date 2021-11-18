const eth = require("../contracts/eth");
const Constants = require('../config/constants');
let transfer = require('../db/transfer');
let scanblockInfo = require('../db/scanblock');

const actionPlaNFT = {}

actionPlaNFT.startScan = async function (contracts) {
    await scanPlaTNFT(contracts);
}

async function scanPlaTNFT(target_contracts) {
    await Promise.all(target_contracts.map(async (contract) => {
        const eventFilter = {
            topics: [Constants.event_topics.Pla_TNFT.Transfer]
        }
        //  获取起始扫描区块
        console.log("this current contract is: " + contract.address);
        const lastScanNumber = await scanblockInfo.actiongetLastScan(contract.address);
        const provider = await eth.getProvider();
        const currentBlockId = await provider.getBlockNumber();
        const startBlockId = lastScanNumber + 1;
        const endBlockId = currentBlockId - startBlockId > Constants.max_scan ? startBlockId + Constants.max_scan : currentBlockId;
        console.log("================scan Pla_TNFT events start %d===========================", startBlockId)
        const scanResult = await contract.queryFilter(eventFilter, startBlockId, endBlockId);
        await Promise.all(scanResult.map(async (value) => {
            const toAdr = value.args['to'];
            const contract_adr = value.address;
            const tokenId = parseInt(value.args['tokenId']._hex);
            await transfer.actionUpdateNFTInfo(contract_adr, toAdr, tokenId);
            await transfer.actionUpdateSale(contract_adr, toAdr, tokenId);
            await transfer.actionDelListing(contract_adr, tokenId);
            await transfer.actionDelOffer(contract_adr, toAdr, tokenId);
        }));
        await scanblockInfo.actionUpdateLastScan(contract.address, lastScanNumber, endBlockId);
        console.log('startBlockId:%d \n endBlockId:%d \n success count:%d \n', startBlockId, endBlockId, scanResult.length);
    }));
}

module.exports = actionPlaNFT;
