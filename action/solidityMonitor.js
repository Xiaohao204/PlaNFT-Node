const eth = require("../contracts/eth");
const Constants = require('../config/constants');
let transfer = require('../db/transfer');
let scanblockInfo = require('../db/scanblock');

const actionPlaNFT = {}

actionPlaNFT.startScan = async function (contracts) {
    await scanPlaTNFT(contracts);
};

// actionPlaNFT.startScan = async function (contracts) {
//     contracts.map(async (contract) => {
//         contract.on("Transfer", (from, to, tokenId) => {
//             console.log(tokenId);
//             console.log('address:%s from:%s to:%s tokenId:%d \n', contract.address, from, to, tokenId.toString());
//             transfer.actionUpdateNFTInfo(contract.address, to, tokenId.toString());
//             transfer.actionUpdateSale(contract.address, from, tokenId.toString());
//             transfer.actionDelListing(contract.address, tokenId.toString());
//             transfer.actionDelOffer(contract.address, to, tokenId.toString());
//         });
//     });
// }

async function scanPlaTNFT(target_contracts) {
    const eventFilter = {
        topics: [Constants.event_topics.Pla_TNFT.Transfer]
    }
    //  获取起始扫描区块
    const provider = await eth.getProvider();
    const currentBlockId = await provider.getBlockNumber();

    await Promise.all(target_contracts.map(async (contract) => {
        const contractId = contract.address;
        const lastScanNumber = await scanblockInfo.actiongetLastScan(contractId);
        const startBlockId = lastScanNumber + 1;
        const endBlockId = currentBlockId - startBlockId > Constants.max_scan ? startBlockId + Constants.max_scan : currentBlockId;
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
        await scanblockInfo.actionUpdateLastScan(contractId, lastScanNumber, endBlockId);
        console.log('contractId: ' + contractId);
        console.log('startBlockId:%d \n endBlockId:%d \n success count:%d \n', startBlockId, endBlockId, scanResult.length);
    }));
}

module.exports = actionPlaNFT;
