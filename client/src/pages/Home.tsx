import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { getUsers } from '../services/api.ts'; // Импортируем функцию для получения пользователей

const Home: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null); // Сбрасываем ошибку
        try {
            const token = localStorage.getItem('token'); // Получаем токен из localStorage
            if (!token) {
                throw new Error('Нет токена авторизации');
            }
            const usersData = await getUsers(token); // Получаем данные пользователей
            setUsers(usersData);
        } catch (error) {
            setError('Не удалось получить список пользователей');
            console.error('Ошибка:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <h1 className="text-3xl text-center mt-10">Welcome to the Banking App</h1>
            <div className="text-center mt-5">
                <button
                    onClick={fetchUsers}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Show All Users
                </button>
            </div>
            {loading && <p className="text-center mt-5">Loading users...</p>}
            {error && <p className="text-center mt-5 text-red-500">{error}</p>}
            {!loading && !error && users.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl text-center mb-5">Users List</h2>
                    <ul className="list-disc mx-auto max-w-2xl">
                        {users.map((user) => (
                            <li key={user.id} className="text-lg">
                                {user.name} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
