import React, { useState } from 'react';
import { transfer } from '../services/api';

const TransactionPage: React.FC = () => {
    const [fromAccountId, setFromAccountId] = useState<string>('');
    const [toAccountId, setToAccountId] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const token = localStorage.getItem('token');

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        try {
            await transfer(fromAccountId, toAccountId, amount, token);
            alert('Transfer successful');
        } catch (error) {
            console.error('Transfer failed', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mt-10">Transfer Money</h2>
            <form onSubmit={handleTransfer} className="space-y-4">
                <input
                    type="text"
                    placeholder="From Account ID"
                    value={fromAccountId}
                    onChange={(e) => setFromAccountId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="To Account ID"
                    value={toAccountId}
                    onChange={(e) => setToAccountId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded"
                >
                    Transfer
                </button>
            </form>
        </div>
    );
};

export default TransactionPage;
