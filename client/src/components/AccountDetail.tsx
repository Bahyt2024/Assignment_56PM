import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccountDetails } from '../services/api';

interface Account {
    _id: string;
    accountType: string;
    currency: string;
    balance: number;
}

const AccountDetails: React.FC = () => {
    const { id } = useParams(); // Получаем id из URL
    const [account, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            if (id) {
                try {
                    const response = await getAccountDetails(id, localStorage.getItem('token') || '');
                    setAccount(response.data);
                } catch (error) {
                    console.error('Error fetching account details', error);
                }
            }
        };
        fetchAccountDetails();
    }, [id]);

    if (!account) {
        return <div>Loading...</div>; // Если данные еще не загружены
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6">Account Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p><strong>Account Type:</strong> {account.accountType}</p>
                <p><strong>Currency:</strong> {account.currency}</p>
                <p><strong>Balance:</strong> ${account.balance}</p>
            </div>
        </div>
    );
};

export default AccountDetails;
