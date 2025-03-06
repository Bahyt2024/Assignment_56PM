import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { accessToken } = await login(email, password);  // Деструктурируем ответ
            localStorage.setItem('token', accessToken);  // Сохраняем токен
            navigate('/dashboard');  // Перенаправляем на страницу dashboard
        } catch (error) {
            console.error('Login failed', error);  // Логируем ошибку, если вход не удался
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Перенаправление на страницу регистрации
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
                type="email"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button
                className="w-full p-2 bg-blue-500 text-white rounded mb-4"
                onClick={handleLogin}
            >
                Login
            </button>
            <div className="text-center">
                <span>Don't have an account?</span>
                <button
                    className="ml-2 text-blue-500 hover:underline"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Login;
