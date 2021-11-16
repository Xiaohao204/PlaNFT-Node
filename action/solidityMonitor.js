const eth = require("../contracts/eth");
const Constants = require('../config/constants');
let transfer = require('../db/transfer');
let scanblockInfo = require('../db/scanblock');

const actionPlaNFT = {}

actionPlaNFT.startScan = async function () {
    //獲取NFT合約地址
    let nftAddress = await transfer.actionGetNFTInfo();
    if (nftAddress.length != undefined) {
        for (let i = 0; i < nftAddress.length; i++) {
            const other_contract = await eth.other_contract(nftAddress[i]);
            // 获取起始扫描区块
            // const lastScanNumber = await scanblockInfo.actiongetLastScan(other_contract.address);
            // const provider = await eth.getProvider();
            // const currentBlockId = await provider.getBlockNumber();
            // const startBlockId = lastScanNumber + 1;
            // const endBlockId = currentBlockId - startBlockId > Constants.max_scan ? startBlockId + Constants.max_scan : currentBlockId;
            scanPlaTNFT(other_contract, ['Transfer']);
        }
    }

    //單個合約地址
    // const other_contract = await eth.other_contract('0xA2dcD2CD4Fc5d94134eb17d050Ed1029309ad0d1');
    // // 获取起始扫描区块
    // let lastScanNumber = await scanblockInfo.actiongetLastScan('0xA2dcD2CD4Fc5d94134eb17d050Ed1029309ad0d1');
    // const startBlockId = lastScanNumber + 1;
    // const provider = await eth.getProvider();
    // const currentBlockId = await provider.getBlockNumber();
    // const endBlockId = currentBlockId - startBlockId > Constants.max_scan ? startBlockId + Constants.max_scan : currentBlockId;
    // console.log("================scan Pla_TNFT events start %d===========================", startBlockId)

    // await scanPlaTNFT(other_contract, startBlockId, endBlockId, ['Transfer']);

    // await scanblockInfo.actionUpdateLastScan('0xA2dcD2CD4Fc5d94134eb17d050Ed1029309ad0d1', lastScanNumber, endBlockId);
    // console.log("================scan Pla_TNFT events end %d===========================", endBlockId)
}

async function scanPlaTNFT(Pla_TNFTContract,eventNames) {
    while (true) {
        // console.log(Pla_TNFTContract.address)
        await Promise.all(eventNames.map(async (eventName) => {
            const eventFilter = {
                topics: [Constants.event_topics.Pla_TNFT.Transfer]
            }
            // 获取起始扫描区块
            const lastScanNumber = await scanblockInfo.actiongetLastScan(Pla_TNFTContract.address);
            const provider = await eth.getProvider();
            const currentBlockId = await provider.getBlockNumber();
            const startBlockId = lastScanNumber + 1;
            const endBlockId = currentBlockId - startBlockId > Constants.max_scan ? startBlockId + Constants.max_scan : currentBlockId;
            console.log("================scan Pla_TNFT events start %d===========================", startBlockId)
            console.log(Pla_TNFTContract.address)
            const scanResult = await Pla_TNFTContract.queryFilter(eventFilter, startBlockId, endBlockId);
            await Promise.all(scanResult.map(async (value) => {
                const toAdr = value.args['to'];
                const contract_adr = value.address;
                const tokenId = parseInt(value.args['tokenId']._hex);
                await transfer.actionUpdateNFTInfo(contract_adr, toAdr, tokenId);
                await transfer.actionUpdateSale(contract_adr, toAdr, tokenId);
                await transfer.actionDelListing(contract_adr, tokenId);
                await transfer.actionDelOffer(contract_adr, toAdr, tokenId);
            }));
            await scanblockInfo.actionUpdateLastScan(Pla_TNFTContract.address, lastScanNumber, endBlockId);
            console.log(' scan %s event \n startBlockId:%d \n endBlockId:%d \n success count:%d \n', eventName, startBlockId, endBlockId, scanResult.length);
        }));
    }
}

module.exports = actionPlaNFT;
