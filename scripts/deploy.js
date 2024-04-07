const BigNumber = require("bignumber.js");
const axios = require("axios");

// https://www.youtube.com/watch?v=Az1X5sFB8nU
async function main() {
    console.log("deploying...");
    const signers = await ethers.getSigners();
    console.log(signers);
    const deployer = signers[0];
    console.log(deployer);

    //get contracts
    const erc20 = await ethers.getContractFactory("MockERC20");
    const bn = new BigNumber(1000000000000000000 * 10 ** 9);

    // deploy and mint sacks
    const deployBet = await erc20.deploy(deployer);

    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exit(0);
});
