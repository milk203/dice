require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@chainlink/hardhat-chainlink");

/** @type import('hardhat/config').HardhatUserConfig */
var api_key = process.env.api_key;
var mnemonic = process.env.mnemonic;
module.exports = {
    solidity: "0.8.24",
    // networks: {
    //     sepolia: {
    //         url: `https://eth-sepolia.g.alchemy.com/v2/${api_key}`,
    //         accounts: {
    //             mnemonic: `${mnemonic}`,
    //         },
    //     },
    // },
};
