const Constants = require('../config/constants')

const CACHE = {
    BlockNumber: undefined
}

CACHE.setBlockNum = function (blockNumber) {
    CACHE.BlockNumber = blockNumber;
}
CACHE.getBlockNum = function () {
    let blockNum = CACHE.BlockNumber;
    if (blockNum === undefined) {
        blockNum = Constants.startNumber;
        CACHE.setBlockNum(blockNum)
    }
    return blockNum
}
module.exports = CACHE
