const eth = require("../contracts/eth");
const Constants = require('../config/constants');

const scanZKRandom = {}

scanZKRandom.startScan = async function () {
    // get contract
    const ExchangeContract = await eth.exchange_contract();
    // console.log(ExchangeContract);


    const currentBlockId = await (await eth.getProvider()).getBlockNumber();
    const lastScanNumber = currentBlockId + 2000;
    const startBlockId = currentBlockId - 2000;
    console.log(currentBlockId);
    const endBlockId = currentBlockId - startBlockId > Constants.max_scan ? startBlockId + Constants.max_scan : currentBlockId;
    await scanZKRandomCore(ExchangeContract, startBlockId, endBlockId, ['Approval']);
}

async function scanZKRandomCore(ExchangeContract, startBlockId, endBlockId, eventNames) {
    await Promise.all(eventNames.map(async (eventName) => {
        const eventFilter = {
            address: Constants.eth_contract.plaNFTExchange,
            topics: [Constants.event_topics.ZKRandomCore[eventName]]
        }
        const scanResult = await ExchangeContract.queryFilter(eventFilter, startBlockId, endBlockId);
        console.log("scanResult is" + scanResult);
        switch (eventName) {
            case 'Approval': {
                const newProjectArray = [];
                await Promise.all(scanResult.map(async (value) => {
                    const createTime = await eth.getBlockTime(value.blockHash);
                    const NewProject = {
                        blockNumber: value.blockNumber,
                        blockHash: value.blockHash,
                        transactionIndex: value.transactionIndex,
                        transactionHash: value.transactionHash,
                        logIndex: value.logIndex,
                        projectId: value.args['projectId'].toNumber(),
                        name: value.args['name'],
                        oper: value.args['oper'],
                        createTime: createTime
                    }
                    newProjectArray.push(NewProject);
                }));
                console.log(newProjectArray);
                // await ZKRandomDb.insertNewProject(newProjectArray);
                break
            }
            default: {
                console.log('No this event %s', eventName)
            }
        }
        console.log('scan %s event \n startBlockId:%d \n endBlockId:%d \n success count:%d \n', eventName, startBlockId, endBlockId, scanResult.length);
    }));
}

scanZKRandom.checkScan = async function () {

}

module.exports = scanZKRandom;
