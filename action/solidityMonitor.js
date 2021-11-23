const eth = require("../contracts/eth");
const Constants = require('../config/constants');
let transfer = require('../db/transfer');
let scanblockInfo = require('../db/scanblock');
let getHttp = require('../config/gethttps');


const actionPlaNFT = {}

actionPlaNFT.startScan = async function (contracts) {
    await scanPlaTNFT(contracts);
};

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
            const nftCount = await transfer.actionNFTCount(contract_adr, tokenId);
            if (nftCount > 0) {
                await transfer.actionUpdateNFTInfo(contract_adr, toAdr, tokenId);
                await transfer.actionUpdateSale(contract_adr, toAdr, tokenId);
                await transfer.actionDelListing(contract_adr, tokenId);
                await transfer.actionDelOffer(contract_adr, toAdr, tokenId);
            }
            else {
                const tokenURI = await contract.tokenURI(parseInt(value.args['tokenId']._hex));
                if (tokenURI != '') {
                    // const url = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
                    const urls = tokenURI.replace("ipfs://", "https://dweb.link/ipfs/");
                    let metadata = null;
                    getHttp.getHttpData(urls, async (err, data) => {
                        console.log('data is :\n', data);
                        // 返回交易记录
                        metadata = JSON.parse(data);
                        const userAddress = toAdr;
                        //sales 
                        const type = 3;
                        const status = 0;
                        const collect_num = 0;
                        const viewed_num = 0;

                        const sales_id = await transfer.actionInsertSale(userAddress, type, status, collect_num, viewed_num);

                        //nftinfo
                        const collectionId = 2;
                        const contractName = "";
                        let description = "";
                        if (metadata.description != undefined)
                            description = (metadata.description).toString();
                        // const properties = metadata.attributes;
                        const properties = "";
                        if (metadata.attributes != undefined)
                            attributes = (metadata.attributes).toString();
                        const image = metadata.image;
                        let image_url = null;
                        if (image != null)
                            image_url = image.replace("ipfs://", "https://ipfs.io/ipfs/");
                        let name = metadata.name;
                        let title = name;
                        if (name == null)
                            title = contractName + "#" + tokenId;
                        const is_frozen = 1;
                        await transfer.actionNewNFTInfo(sales_id, collectionId, tokenId, contract_adr, userAddress, description, properties, image_url, title, is_frozen, tokenURI, data);
                    })
                }
            }
        }));
        await scanblockInfo.actionUpdateLastScan(contractId, lastScanNumber, endBlockId);
        console.log('contractId: ' + contractId);
        console.log('startBlockId:%d \n endBlockId:%d \n success count:%d \n', startBlockId, endBlockId, scanResult.length);
    }));
}

module.exports = actionPlaNFT;
