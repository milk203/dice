import { ethers } from "ethers";
import "../styles/Dicegame.css";
import "../styles/Navbar.css";
import grass from "../images/grass4.png";
import unicorn from "../images/unicorn.png";
import React, { useState, useEffect } from "react";

function App({
    ganache_signer,
    user_wallet,
    sepolia_wallet,
    dice_game_contract,
    dice_token_contract,
}) {
    const [position, setPosition] = useState({ x: 0, y: 0, a: "-", b: "-" });
    const [angle, setAngle] = useState(0);

    // useEffect(() => {
    //     const moveImage = () => {
    //         const newX = Math.random() * window.innerWidth;
    //         console.log(newX);
    //         const newY = Math.random() * window.innerHeight;
    //         console.log(newY);
    //         const newA = Math.random() > 0.5 ? "+" : "-";
    //         const newB = Math.random() > 0.5 ? "+" : "-";
    //         console.log(newA);
    //         console.log(newB);
    //         setPosition({ x: newX, y: newY, a: newA, b: newB });
    //         setTimeout(moveImage, 100); // Move every second
    //     };

    //     moveImage();

    //     return () => clearTimeout(moveImage);
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAngle((prevAngle) => (prevAngle + 1) % 360);
            console.log("testing");
        }, 10); // Change the angle every 10ms

        return () => clearInterval(interval);
    }, []);

    const placeBet = async () => {
        var getAllowance;
        var getBalance;
        getBalance = await dice_token_contract.balanceOf(user_wallet.address);

        const setAllowance = await dice_token_contract.approve(
            dice_game_contract.target,
            "1000000000000000"
        );
        await setAllowance.wait();
        getAllowance = await dice_token_contract.allowance(
            user_wallet.address,
            dice_game_contract.target
        );

        const placeBet = await dice_game_contract.placeBet(10, 2);
    };

    return (
        <div className="dicegame-main">
            <img src={grass} className="grass1"></img>
            <img src={grass} className="grass2"></img>
            <img src={grass} className="grass3"></img>
            <img src={grass} className="grass4"></img>
            <img src={grass} className="grass5"></img>
            <img src={grass} className="grass6"></img>
            <div className="circle">
                <img
                    src={unicorn}
                    className="unicorn1"
                    style={{
                        transform: `rotate(${angle}deg) translateX(100px) rotate(-${angle}deg)`,
                    }}
                ></img>
            </div>

            {/* <img
                src={unicorn}
                className="unicorn1"
                style={{
                    position: "absolute",
                    top: position.a + position.y + "px",
                    left: position.b + position.x + "px",
                    transition: "top 0.5s, left 0.5s", // Smooth transition
                }}
            ></img> */}

            {/* <img src={unicorn} className="unicorn2"></img>
            <img src={unicorn} className="unicorn3"></img>
            <img src={unicorn} className="unicorn4"></img>
            <img src={unicorn} className="unicorn5"></img>
            <img src={unicorn} className="unicorn6"></img> */}
        </div>
    );
}

export default App;
