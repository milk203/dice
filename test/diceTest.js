const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const BigNumber = require("bignumber.js");
const { expect } = require("chai");

describe("Dice", function () {
    async function deployContractAndSetVariables() {
        const [owner, address, address2] = await ethers.getSigners();

        // get contracts
        const dice_contract_factory = await ethers.getContractFactory("Dice");
        const erc20_contract_factory = await ethers.getContractFactory(
            "MockERC20"
        );

        // //deploy contracts

        const diceToken = await erc20_contract_factory.deploy(owner.address);

        const diceGame = await dice_contract_factory.deploy(diceToken);
        const maxUint256 = BigInt(
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
        const bn = new BigNumber(1000000000000000000000);
        const placeHolder = 10000;

        // mint dice tokens for bets
        await diceToken.mint(owner, placeHolder);
        await diceToken.mint(address, placeHolder);
        await diceToken.mint(diceGame, placeHolder);

        return {
            diceToken,
            diceGame,
            maxUint256,
            owner,
            address,
        };
    }

    it("should place bet correctly", async function () {
        const { diceToken, diceGame, maxUint256, owner, address } =
            await loadFixture(deployContractAndSetVariables);

        var Contractbalance;
        Contractbalance = await diceToken.balanceOf(address.address);

        await diceToken
            .connect(address)
            .approve(diceGame, maxUint256.toString());
        await diceGame.connect(address).placeBet(10, 5);

        Contractbalance = await diceToken.balanceOf(address.address);
    });
    it("should place bet correctly", async function () {
        const { diceToken, diceGame, maxUint256, owner, address } =
            await loadFixture(deployContractAndSetVariables);

        await diceToken
            .connect(address)
            .approve(diceGame, maxUint256.toString());
        await diceGame.connect(address).placeBet(10, 5);
    });
});
