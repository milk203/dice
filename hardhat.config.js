require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
console.log(process.env.api_key);
console.log(process.env.mnemonic);
var api_key = process.env.api_key;
var mnemonic = process.env.mnemonic;
module.exports = {
    solidity: "0.8.24",
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${api_key}`,
            accounts: {
                mnemonic: `${mnemonic}`,
            },
        },
    },
};
