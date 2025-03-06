const Account = require('../models/account-model');
const ApiError = require('../exceptions/api-error');

class AccountController {


    // Создание нового банковского счета
    async createAccount(req, res, next) {
        try {
            const { accountType, currency } = req.body;
            const userId = req.user.id; // Получаем ID пользователя из токена

            // Генерация уникального номера счета
            const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

            const newAccount = await Account.create({
                user: userId,
                accountType,
                balance: 0, // Баланс по умолчанию 0
                currency: currency || 'USD', // Если не указана валюта, ставим USD
                accountNumber: accountNumber // Добавляем номер счета
            });

            res.json({ message: 'Account created successfully', account: newAccount });
        } catch (error) {
            next(error);
        }
    }

    // Получение всех счетов пользователя
    async getAccounts(req, res, next) {
        try {
            const userId = req.user.id;
            const accounts = await Account.find({ user: userId });

            res.json(accounts);
        } catch (error) {
            next(error);
        }
    }

    // Получение счета по ID
    async getAccountById(req, res, next) {
        try {
            const { id } = req.params;
            const account = await Account.findById(id).populate('user', 'email');

            if (!account) {
                throw ApiError.BadRequest('Account not found');
            }

            res.json(account);
        } catch (error) {
            next(error);
        }
    }

    // Удаление счета
    async deleteAccount(req, res, next) {
        try {
            const { id } = req.params;
            const account = await Account.findById(id);
            if (!account) {
                throw ApiError.BadRequest('Account not found');
            }

            // Удаление счета с использованием findByIdAndDelete
            await Account.findByIdAndDelete(id);

            res.json({ message: 'Account deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AccountController();
