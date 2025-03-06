import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Измените на ваш backend URL

// Создаем экземпляр axios с базовым URL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Функция для регистрации пользователя
export const register = (email: string, password: string) =>
    api.post('/registration', { email, password });

// Функция для авторизации пользователя
export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });
        const { accessToken, refreshToken, user } = response.data;

        return { accessToken, refreshToken, user };  // Возвращаем токены и пользователя
    } catch (error) {
        console.error('Ошибка при логине', error);
        throw error;
    }
};

// Функция для создания счета
export const createAccount = (accountType: string, currency: string, token: string) => {
    return api.post(
        '/accounts',
        { accountType, currency },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Функция для получения всех счетов
export const getAccounts = (token: string) => {
    return api.get('/accounts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const deleteAccount = async (accountId: string, token: string) => {
    return api.delete(`/accounts/${accountId}`, {  // Используем тот же экземпляр api
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAccountDetails = async (accountId: string, token: string) => {
    return api.get(`/accounts/${accountId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
// Функция для получения счета по ID
export const getAccountById = async (accountId: string, token: string) => {
    try {
        const response = await api.get(`/accounts/${accountId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Возвращаем данные счета
    } catch (error) {
        console.error('Ошибка при получении счета', error);
        throw error;
    }
};

// Функция для получения списка всех пользователей
export const getUsers = async (token: string) => {
    try {
        const response = await api.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Возвращаем данные пользователей
    } catch (error) {
        console.error('Ошибка при получении пользователей', error);
        throw error;
    }
};

// Функция для перевода между счетами
export const transfer = (
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number,
    token: string
) => {
    return api.post(
        '/transactions/transfer',
        { fromAccountNumber, toAccountNumber, amount },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
export const withdraw = (
    accountId: string,
    amount: number,
    token: string
) => {
    return api.post(
        '/transactions/withdraw',
        { accountId, amount },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getTransactionHistory = (
    accountId: string,
    token: string
) => {
    return api.get(`/transactions/history/${accountId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const deposit = (
    accountId: string,
    amount: number,
    token: string
) => {
    return api.post(
        '/transactions/deposit',
        { accountId, amount },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

