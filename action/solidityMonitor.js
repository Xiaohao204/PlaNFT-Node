const eth = require("../contracts/eth");
const Constants = require('../config/constants');
const CACHE = require("../config/cache");
let transfer = require('../db/transfer');
let scanblockInfo = require('../db/scanblock');
const constants = require("../config/constants");

const scanZKRandom = {}

scanZKRandom.startScan = async function () {
    // get contract
    // const ZKRandomCoreContract = await eth.ZKRandomCore_contract();
    // 获取合约实例
    // const Pla_TNFTContract = await eth.Pla_TNFT_contract(); 
    // const nftAddress = transfer.actionGetNFTInfo();
    // const other_contract = "";
    // console.log(nftAddress.length);
    // if (nftAddress.length != undefined)
    //     for (const i = 0; i <= nftAddress.length; i++) {
    //         other_contract = await eth.other_contract(nftAddress[i]);
    //         console.log(nftAddress[i]);
    //     }                                          
    const other_contract = await eth.other_contract('0x3c4AbE3bF4b15046e5DaF238af0bc4d5B7E75463');
    const other_contract1 = await eth.other_contract('0x60Bb999F4cE5f9f660260FCC0c0Fa29cEb0E6d55');
    const other_contract2 = await eth.other_contract('0xBe6d385248dAA4b2B9D8199cb406e8D13B16a84f');
    const other_contract3 = await eth.other_contract('0xBF93215fA7260B5c3C357c17025eba601BBF96c2');
    const other_contract4 = await eth.other_contract('0xcA2231d0DCf25042726B1e69EdEEc0fC17c5Eba5');
    const other_contract5 = await eth.other_contract('0xA2dcD2CD4Fc5d94134eb17d050Ed1029309ad0d1');
    const other_contract6 = await eth.other_contract('0xcFb65b49fdD3e7136aDE788c4bc5e606E7605CD0');
    // calculate the scan range
    // const lastScanNumber = await ZKRandomDb.getLastScanNumber();
    // 获取起始扫描区块
    // const lastScanNumber = await scanblock.scanblock
    const lastScanNumber = CACHE.getBlockNum();
    const startBlockId = lastScanNumber + 1;
    const provider = await eth.getProvider();
    const currentBlockId = await provider.getBlockNumber();
    const endBlockId = currentBlockId - startBlockId > Constants.max_scan ? startBlockId + Constants.max_scan : currentBlockId;

    // start scan
    // console.log("================scan ZKRandom events start %d===========================", startBlockId)
    console.log("================scan Pla_TNFT events start %d===========================", startBlockId)

    await scanPlaTNFT(other_contract, startBlockId, endBlockId, ['Transfer']);
    await scanPlaTNFT(other_contract1, startBlockId, endBlockId, ['Transfer']);
    await scanPlaTNFT(other_contract2, startBlockId, endBlockId, ['Transfer']);
    await scanPlaTNFT(other_contract3, startBlockId, endBlockId, ['Transfer']);
    await scanPlaTNFT(other_contract4, startBlockId, endBlockId, ['Transfer']);
    await scanPlaTNFT(other_contract5, startBlockId, endBlockId, ['Transfer']);
    await scanPlaTNFT(other_contract6, startBlockId, endBlockId, ['Transfer']);

    CACHE.setBlockNum(endBlockId)
    // console.log("================scan ZKRandom events end %d===========================", endBlockId)
    console.log("================scan Pla_TNFT events end %d===========================", endBlockId)
}

async function scanPlaTNFT(Pla_TNFTContract, startBlockId, endBlockId, eventNames) {
    await Promise.all(eventNames.map(async (eventName) => {
        const eventFilter = {
            topics: [Constants.event_topics.Pla_TNFT.Transfer]
        }
        const scanResult = await Pla_TNFTContract.queryFilter(eventFilter, startBlockId, endBlockId);
        console.log(scanResult);
        switch (eventName) {
            case 'Transfer': {
                await Promise.all(scanResult.map(async (value) => {
                    const createTime = await eth.getBlockTime(value.blockHash);
                    const fromAdr = value.args['from'];
                    const toAdr = value.args['to'];
                    const tokenId = parseInt(value.args['tokenId']._hex);
                    const contract_adr = constants.eth_contract.Pla_TNFT;
                    await transfer.actionUpdateNFTInfo(contract_adr, fromAdr, toAdr, tokenId, createTime);
                    await transfer.actionUpdateSale(contract_adr, toAdr, tokenId);
                    await transfer.actionDelListing(contract_adr, tokenId);
                    await transfer.actionDelOffer(contract_adr, toAdr, tokenId);
                    console.log(toAdr);
                }));
                break
            }
            default: {
                console.log('No this event %s', eventName)
            }
        }
        console.log('scan %s event \n startBlockId:%d \n endBlockId:%d \n success count:%d \n', eventName, startBlockId, endBlockId, scanResult.length);
    }));
}


module.exports = scanZKRandom;
