import React, { useEffect, useState } from 'react';
import { getAccounts, deleteAccount } from '../services/api';
import { Link } from 'react-router-dom';

interface Account {
    _id: string;
    accountType: string;
    currency: string;
    balance: number;
}

interface AccountListProps {
    token: string;
}

const AccountList: React.FC<AccountListProps> = ({ token }) => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAccounts(token);
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts', error);
            }
        };
        fetchAccounts();
    }, [token]);

    // Функция для удаления счета
    const handleDelete = async (accountId: string) => {
        try {
            await deleteAccount(accountId, token);
            // Обновляем список счетов после удаления
            setAccounts(accounts.filter(account => account._id !== accountId));
        } catch (error) {
            console.error('Error deleting account', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800">Your Accounts</h3>
            {accounts.length === 0 ? (
                <p className="text-center text-gray-500">You have no accounts yet.</p>
            ) : (
                <ul className="space-y-4">
                    {accounts.map((account) => (
                        <li
                            key={account._id}
                            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                        >
                            <Link to={`/account/${account._id}`} className="flex flex-col">
                                <span className="font-bold text-lg text-gray-700">{account.accountType}</span>
                                <span className="text-sm text-gray-500">{account.currency} - Balance: ${account.balance}</span>
                            </Link>
                            <button
                                onClick={() => handleDelete(account._id)}
                                className="ml-4 text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2 transition-colors duration-300"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AccountList;
