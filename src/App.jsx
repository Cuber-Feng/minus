import { useState } from "react";
import "./style.css";

export default function App() {
    const [balance, setBalance] = useState(1000.01);
    const [input, setInput] = useState("");

    const addMoney = () => {
        setBalance(Math.round((balance + Number(input)) * 100) / 100);
        setInput("");
    };

    const spendMoney = () => {
        setBalance(Math.round((balance - Number(input)) * 100) / 100);
        setInput("");
    };

    const setMoney = () => {
        setBalance(Math.round(Number(input) * 100) / 100);
        setInput("");
    };

    return (
        <div className="container">
            <h1>💰 My Balance</h1>

            <h2>{balance}</h2>

            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter amount"
            />

            <div className="buttons">
                <button onClick={addMoney}>Add</button>
                <button onClick={spendMoney}>Spend</button>
                <button onClick={setMoney}>Set</button>
            </div>
        </div>
    );
}