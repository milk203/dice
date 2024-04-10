const BigNumber = require("bignumber.js");
const axios = require("axios");

// https://www.youtube.com/watch?v=Az1X5sFB8nU
async function main() {
    console.log("deploying to sepolia...");
    const signers = await ethers.getSigners();
    const deployer = signers[0];
    console.log(deployer.address, "deployer address");

    //get contracts
    const dice_contract_factory = await ethers.getContractFactory("Dice");
    const erc20 = await ethers.getContractFactory("MockERC20");

    const diceToken = await erc20.deploy(deployer.address);
    const diceGame = await dice_contract_factory.deploy(diceToken.target);
    console.log(diceGame.target, "diceGame.target");

    console.log("diceGame address deployed at....", diceGame.target);
    console.log("diceToken address deployed at....", diceToken.target);

    const placeHolder = 1000000000;
    const mintToDeployer = await diceToken.mint(deployer.address, placeHolder);
    await mintToDeployer.wait();
    const mintToDiceContract = await diceToken.mint(
        diceGame.target,
        placeHolder
    );
    await mintToDiceContract.wait();

    // await diceToken.mint(
    //     "0x30a00f15F3f98dF7228D019d3bD80AD6164eC94a",
    //     placeHolder
    // );

    const bn = new BigNumber(1000000000000000000 * 10 ** 9);

    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exit(0);
});
