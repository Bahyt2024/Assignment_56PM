import React, { useState } from 'react';
import { register } from '../services/api'; // Функция для отправки данных на сервер
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Для отображения ошибок
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            await register(email, password); // Отправляем запрос на регистрацию
            navigate('/login'); // Перенаправляем на страницу входа после успешной регистрации
        } catch (err) {
            console.error('Registration failed', err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Register</h2>
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
            <input
                type="password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />
            {error && (
                <p className="text-red-500 text-sm mb-4">
                    {error}
                </p>
            )}
            <button
                className="w-full p-2 bg-blue-500 text-white rounded"
                onClick={handleRegister}
            >
                Register
            </button>
            <div className="text-center mt-4">
                <span>Already have an account?</span>
                <button
                    className="ml-2 text-blue-500 hover:underline"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Register;
