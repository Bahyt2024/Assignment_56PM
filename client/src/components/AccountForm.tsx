import React, { useState } from 'react';
import { createAccount } from '../services/api';

interface AccountFormProps {
    token: string;
}

const AccountForm: React.FC<AccountFormProps> = ({ token }) => {
    const [accountType, setAccountType] = useState<string>('savings');
    const [currency, setCurrency] = useState<string>('USD');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAccount(accountType, currency, token);
            alert('Account created successfully');
        } catch (error) {
            console.error('Error creating account', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Account Type</label>
                    <select
                        className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        <option value="savings">Savings</option>
                        <option value="checking">Checking</option>
                    </select>

                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Currency</label>
                    <input
                        type="text"
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        placeholder="USD"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default AccountForm;
