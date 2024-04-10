// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ERC20Extended is IERC20 {
    function mint(address to, uint256 _amount) external;
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        _transferOwnership(_msgSender());
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract Dice is Ownable {
    ERC20Extended public betToken;
    mapping(address => UserBet) private userBets;
    uint256 public minimumBet = 100;
    uint256 public odds;
    uint256 private nonce = 0;

    event BetPlaced(address player, uint256 amount, uint256 betValue, bool won);

    struct UserBet {
        // ERC20Extended betToken;
        uint256 amount;
        uint8 betValue;
        bool isBetPlaced;
    }

    constructor(address _betToken) {
        betToken = ERC20Extended(_betToken);
    }

    function placeBet(uint256 _amount, uint8 betValue) external {
        require(
            userBets[msg.sender].isBetPlaced == false,
            "user already placed a bet"
        );
        require(
            betValue >= 1 && betValue <= 6,
            "bet value must be between 1 and 6"
        );
        require(
            betToken.transferFrom(msg.sender, address(this), _amount),
            "transfer failed"
        );
        userBets[msg.sender].amount = _amount;
        userBets[msg.sender].betValue = betValue;
        userBets[msg.sender].isBetPlaced = true;

        rollDice();
    }

    function rollDice() internal {
        require(userBets[msg.sender].isBetPlaced == true);
        // get number
        uint256 randomNumber = random();

        //compare roll to betValue
        // bool won = true;
        bool won = (userBets[msg.sender].betValue == randomNumber);

        if (won) {
            distributePrize();
        }
        userBets[msg.sender].isBetPlaced = false;
        emit BetPlaced(
            msg.sender,
            userBets[msg.sender].amount,
            userBets[msg.sender].betValue,
            won
        );
    }

    function random() public returns (uint256) {
        //1-6 random number generator
        //chainlink VRF to be implemented in prod, pseudorandom is sufficient for testing
        nonce++;
        // return
        //     (uint256(
        //         keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))
        //     ) % 6) + 1;
        return 2;
    }

    function distributePrize() internal {
        uint256 payout = userBets[msg.sender].amount;
        betToken.approve(address(this), payout);
        betToken.transferFrom(address(this), msg.sender, payout);
    }
}
