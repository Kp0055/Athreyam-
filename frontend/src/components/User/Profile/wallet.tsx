import React, { useState } from 'react';

// Define the Transaction type
interface Transaction {
  id: number;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  date: string;
};


const sampleTransactions: Transaction[] = [
  { id: 1, type: 'Deposit', amount: 100, date: '2025-08-15' },
  { id: 2, type: 'Withdrawal', amount: 50, date: '2025-08-17' },
];

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0); // Starting balance
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [amount, setAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'Deposit' | 'Withdrawal'>('Deposit');

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // Handle transaction type change
  const handleTransactionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(e.target.value as 'Deposit' | 'Withdrawal');
  };

  // Handle transaction submission
  const handleTransaction = () => {
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const newAmount = parseFloat(amount);
    let newBalance = balance;
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type: transactionType,
      amount: newAmount,
      date: new Date().toISOString().split('T')[0], // format as YYYY-MM-DD
    };

    if (transactionType === 'Deposit') {
      newBalance += newAmount;
    } else if (transactionType === 'Withdrawal' && newAmount <= balance) {
      newBalance -= newAmount;
    } else {
      alert('Insufficient balance for withdrawal.');
      return;
    }

    setBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    setAmount('');
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6"> Wallet</h2>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-white">Current Balance: {balance.toFixed(2)} RS</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="p-2 border border-gray-300 rounded-md w-full md:w-60 text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          onChange={handleTransactionTypeChange}
          value={transactionType}
          className="mt-4 md:mt-0 p-2 border border-gray-300 rounded-md w-full md:w-60 text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>
        <button
          onClick={handleTransaction}
          className="mt-6 md:mt-0 bg-indigo-600 text-white p-2 rounded-md w-full md:w-auto hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Transaction
        </button>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h3>
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{transaction.type}</span>
                <span className={`font-semibold ${transaction.type === 'Deposit' ? 'text-green-500' : 'text-red-500'}`}>
                  ${transaction.amount.toFixed(2)}
                </span>
              </div>
              <span className="block text-sm text-gray-500">{transaction.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
