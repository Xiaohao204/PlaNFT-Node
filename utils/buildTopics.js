const ethers = require("ethers");

const OrdersMatched = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("OrdersMatched(bytes32,address,address,address,uint256,uint256)"));

console.log("======================NFT========================")
console.log("OrdersMatched = ", OrdersMatched)
