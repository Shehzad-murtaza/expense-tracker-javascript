"use client";

import React, { useState } from "react";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const addTransaction = (type, description, amount) => {
    const id = transactions.length + 1;
    const newTransaction = { id, type, description, amount };

    setTransactions([...transactions, newTransaction]);

    if (type === "Income") {
      setTotalIncome(totalIncome + amount);
      setBalance(balance + amount);
    } else {
      setTotalExpense(totalExpense + amount);
      setBalance(balance - amount);
    }
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter((txn) => txn.id !== id);
    const deletedTransaction = transactions.find((txn) => txn.id === id);

    if (deletedTransaction) {
      if (deletedTransaction.type === "Income") {
        setTotalIncome(totalIncome - deletedTransaction.amount);
        setBalance(balance - deletedTransaction.amount);
      } else {
        setTotalExpense(totalExpense - deletedTransaction.amount);
        setBalance(balance + deletedTransaction.amount);
      }
    }

    setTransactions(updatedTransactions);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-300">
      <div className="w-full max-w-md p-6 bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-100">
          Expense Tracker
        </h1>
        {/* Balance Section */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-100">
            Balance: ${balance}
          </h2>
          <div className="flex justify-between mt-3 text-lg">
            <span className="text-green-500 font-medium">
              Income: ${totalIncome}
            </span>
            <span className="text-red-500 font-medium">
              Expense: ${totalExpense}
            </span>
          </div>
        </div>
        {/* Add Transaction Form */}
        <TransactionForm addTransaction={addTransaction} />
        {/* Transaction History */}
        <TransactionList transactions={transactions} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

const TransactionForm = ({ addTransaction }) => {
  const [type, setType] = useState("Income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || amount === "" || amount <= 0) {
      setError("All fields are required and amount must be greater than 0.");
      return;
    }

    setError("");
    addTransaction(type, description, Number(amount));
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-400">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-400">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-400">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-gray-700 text-gray-100 rounded-lg py-2 shadow-md hover:bg-gray-600 transition duration-300"
      >
        Add Transaction
      </button>
    </form>
  );
};

const TransactionList = ({ transactions, handleDelete }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-100">Transaction History</h2>
    <ul className="space-y-3">
      {transactions.map((txn) => (
        <li
          key={txn.id}
          className="p-3 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition duration-300"
        >
          <span>{txn.description}</span>
          <span
            className={`${
              txn.type === "Income" ? "text-green-500" : "text-red-500"
            } font-medium`}
          >
            {txn.type === "Income" ? "+" : "-"}${txn.amount}
          </span>
          <button
            onClick={() => handleDelete(txn.id)}
            className="text-gray-500 hover:text-gray-400 transition"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Home;
