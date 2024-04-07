const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const BigNumber = require("bignumber.js");

describe("Lending", function () {
    async function deployContractAndSetVariables() {
        const [owner, address, address2] = await ethers.getSigners();

        //get contracts
        const dice_contract_factory = await ethers.getContractFactory("Dice");
        const erc20_contract_factory = await ethers.getContractFactory(
            "MockERC20"
        );

        //deploy contracts
        const diceToken = await erc20_contract_factory.deploy(owner);
        const diceGame = await dice_contract_factory.deploy(diceToken);
        const maxUint256 = BigInt(
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
        const bn = new BigNumber(1000000000000000000000);

        //mint dice tokens for bets
        await diceToken.mint(owner, bn.toFixed());

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

        await diceGame.connect(owner).placeBet(100, 5);
    });
});
