import { ethers } from "ethers";
import diceGameAbi from "./artifacts/contracts/dice.sol/Dice.json";
import diceTokenAbi from "./artifacts/contracts/erc20.sol/MockERC20.json";
import Navbar from "./components/Navbar";
import Dicegame from "./components/Dicegame";
import "./styles/main.css";

import "./App.css";

function App() {
    //ganache setup
    const local_provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
    const pk_ganache = `${process.env.REACT_APP_GANACHE_PK}`;
    const ganache_signer = new ethers.Wallet(pk_ganache, local_provider);

    //sepolia setup
    const sepolia_provider = new ethers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/k1nf0oOfrryTLAt7fKP2NUENWS98YNH0"
    );
    const sepolia_pk = `${process.env.REACT_APP_SEPOLIA_PK}`;
    const sepolia_wallet = new ethers.Wallet(sepolia_pk, sepolia_provider);

    const user_wallet_pk = `${process.env.REACT_APP_USER_PK}`;
    const user_wallet = new ethers.Wallet(user_wallet_pk, local_provider);

    const dice_game_abi = diceGameAbi["abi"];
    const dice_game_address = "0x41b2d5492f3d52eAe1FC1B4dA9fE0CEd3e5a8eeA";
    const dice_game_contract = new ethers.Contract(
        dice_game_address,
        dice_game_abi,
        user_wallet
    );

    const dice_token_abi = diceTokenAbi["abi"];
    const dice_token_address = "0x360488c093CA174f03736960EBf816672C2247DF";
    const dice_token_contract = new ethers.Contract(
        dice_token_address,
        dice_token_abi,
        user_wallet
    );

    return (
        <div className="main">
            <Navbar />
            <Dicegame
                ganache_signer={ganache_signer}
                sepolia_wallet={sepolia_wallet}
                user_wallet={user_wallet}
                dice_game_contract={dice_game_contract}
                dice_token_contract={dice_token_contract}
            />
        </div>
    );
}

export default App;
