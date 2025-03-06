const Account = require('../models/account-model'); // Импортируем модель Account
const Transaction = require('../models/transaction-model');
const ApiError = require('../exceptions/api-error');
class ReportController {
    // Выписка по счету (операции по счету)
    async getAccountStatement(req, res, next) {
        try {
            const { accountId } = req.params;

            // Получение всех транзакций для указанного счета
            const transactions = await Transaction.find({
                $or: [{ fromAccount: accountId }, { toAccount: accountId }]
            }).sort({ createdAt: -1 });

            if (!transactions || transactions.length === 0) {
                throw ApiError.BadRequest('No transactions found for this account');
            }

            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }

    // Все транзакции клиента (по ID клиента)
    async getCustomerTransactions(req, res, next) {
        try {
            const { customerId } = req.params;

            // Получение всех транзакций для всех счетов клиента
            const accounts = await Account.find({ user: customerId });

            if (!accounts || accounts.length === 0) {
                throw ApiError.BadRequest('No accounts found for this customer');
            }

            const accountIds = accounts.map(account => account._id);

            // Получение всех транзакций для найденных счетов
            const transactions = await Transaction.find({
                $or: [{ fromAccount: { $in: accountIds } }, { toAccount: { $in: accountIds } }]
            }).sort({ createdAt: -1 });

            if (!transactions || transactions.length === 0) {
                throw ApiError.BadRequest('No transactions found for this customer');
            }

            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReportController();
