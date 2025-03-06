import React from 'react';
import Navbar from '../components/Navbar';
import AccountForm from '../components/AccountForm';
import AccountList from '../components/AccountList';

const Dashboard: React.FC = () => {
    const token = localStorage.getItem('token'); // Получаем токен из локального хранилища

    if (!token) {
        return <div>You need to login first!</div>;
    }

    return (
        <div>
            <Navbar />
            <h2 className="text-2xl font-bold mt-10">Dashboard</h2>
            <AccountForm token={token} />
            <AccountList token={token} />
        </div>
    );
};

export default Dashboard;
