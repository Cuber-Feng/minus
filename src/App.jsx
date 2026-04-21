import { useState } from "react";
import "./style.css";

export default function App() {
    const [input, setInput] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");

    const [accounts, setAccounts] = useState([
        { id: 1, name: "HSBC-Debit", balance: 100, currency: "HKD" },
        { id: 2, name: "HSBC-Credit", balance: 1, currency: "HKD" },
        { id: 3, name: "Octopus-iPhone", balance: 0, currency: "HKD" },
        { id: 4, name: "Octopus-Card", balance: 0, currency: "HKD" },
        { id: 5, name: "Standard Chartered", balance: 0, currency: "HKD" },
        { id: 6, name: "BOCHK", balance: 0, currency: "HKD" },
        { id: 7, name: "SIM Card", balance: 0, currency: "HKD" },
        { id: 8, name: "WeChat", balance: 0, currency: "CNY" },
        { id: 9, name: "BOC", balance: 0, currency: "CNY" },
        { id: 10, name: "CCB", balance: 0, currency: "CNY" }
    ]);

    const addAccount = (name, balance) => {
        const newAccount = {
            id: Date.now(),
            name,
            balance
        };

        setAccounts(prev => [...prev, newAccount]);
    };

    const hkdtotal = accounts
        .filter(acc => acc.currency === "HKD")
        .reduce(
            (sum, acc) => sum + acc.balance,
            0
        );

    const cnystotal = accounts
        .filter(acc => acc.currency === "CNY")
        .reduce(
            (sum, acc) => sum + acc.balance,
            0
        );

    const updateBalance = (id, amount) => {
        setAccounts(prev =>
            prev.map(acc =>
                acc.id == id
                    ? { ...acc, balance: amount }
                    : acc
            )
        );
    };

    const deleteAccount = (id) => {
        setAccounts(prev => prev.filter(acc => acc.id !== id));
    };

    const setMoney = (id) => {
        if (id) {
            updateBalance(id, Number(input));
        }
        setInput("");
    };

    return (
        <div className="container">
            <h1>💰 My Balance</h1>
            <h3>HKD: ${hkdtotal.toFixed(2)} | CNY: ¥{cnystotal.toFixed(2)}</h3>

            <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(Number(e.target.value))}
            >
                <option value="">*Select Account</option>
                {
                    accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                            {acc.name} ({acc.currency})
                        </option>
                    ))
                }
            </select>

            <div className="inputset">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter amount"
                    onKeyDown={(e) => { if (e.key === "Enter") { setMoney(selectedAccount); } }}
                />

                <button onClick={() => setMoney(selectedAccount)}>Set</button>
            </div>
            <h3>HKD Accounts</h3>
            <div className="accountsblock">
                {accounts
                    .filter(acc => acc.currency === "HKD")
                    .map(acc => (
                        <div key={acc.id} className="account">
                            <div>{acc.name}</div>
                            <p>${acc.balance.toFixed(2)}</p>
                        </div>
                    ))}
            </div>
            <div>----------------------------------------</div>
            <h3>CNY Accounts</h3>
            <div className="accountsblock">
                {accounts
                    .filter(acc => acc.currency === "CNY")
                    .map(acc => (
                        <div key={acc.id} className="account">
                            <div>{acc.name}</div>
                            <p>¥{acc.balance.toFixed(2)}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}