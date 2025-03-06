const Transaction = require('../models/transaction-model');
const Account = require('../models/account-model');
const ApiError = require('../exceptions/api-error');

class TransactionController {
    // Пополнение счета
    async deposit(req, res, next) {
        try {
            const { accountId, amount } = req.body;

            if (amount <= 0) {
                throw ApiError.BadRequest('Deposit amount must be greater than zero');
            }

            const account = await Account.findById(accountId);
            if (!account) {
                throw ApiError.BadRequest('Account not found');
            }

            account.balance += amount;
            await account.save();

            // Создание записи о транзакции
            await Transaction.create({
                fromAccount: accountId,
                toAccount: accountId,
                amount,
                transactionType: 'deposit',
                status: 'completed'
            });

            res.json({ message: 'Deposit successful', account });
        } catch (error) {
            next(error);
        }
    }

    // Снятие средств со счета
    async withdraw(req, res, next) {
        try {
            const { accountId, amount } = req.body;

            if (amount <= 0) {
                throw ApiError.BadRequest('Withdrawal amount must be greater than zero');
            }

            const account = await Account.findById(accountId);
            if (!account) {
                throw ApiError.BadRequest('Account not found');
            }

            if (account.balance < amount) {
                throw ApiError.BadRequest('Insufficient funds');
            }

            account.balance -= amount;
            await account.save();

            // Создание записи о транзакции
            await Transaction.create({
                fromAccount: accountId,
                toAccount: accountId,
                amount,
                transactionType: 'withdrawal',
                status: 'completed'
            });

            res.json({ message: 'Withdrawal successful', account });
        } catch (error) {
            next(error);
        }
    }

    // Перевод средств между счетами
    async transfer(req, res, next) {
        try {
            const { fromAccountNumber, toAccountNumber, amount } = req.body;

            if (amount <= 0) {
                throw ApiError.BadRequest('Transfer amount must be greater than zero');
            }

            // Ищем счета по номерам
            const fromAccount = await Account.findOne({ accountNumber: fromAccountNumber });
            const toAccount = await Account.findOne({ accountNumber: toAccountNumber });

            if (!fromAccount || !toAccount) {
                throw ApiError.BadRequest('One or both accounts not found');
            }

            if (fromAccount.balance < amount) {
                throw ApiError.BadRequest('Insufficient funds');
            }

            fromAccount.balance -= amount;
            toAccount.balance += amount;

            await fromAccount.save();
            await toAccount.save();

            // Создание записи о транзакции
            await Transaction.create({
                fromAccount: fromAccount._id,
                toAccount: toAccount._id,
                amount,
                transactionType: 'transfer',
                status: 'completed'
            });

            res.json({ message: 'Transfer successful', fromAccount, toAccount });
        } catch (error) {
            next(error);
        }
    }


    // История транзакций по счету
    async getTransactionHistory(req, res, next) {
        try {
            const { accountId } = req.params;
            const transactions = await Transaction.find({ $or: [{ fromAccount: accountId }, { toAccount: accountId }] })
                .sort({ createdAt: -1 }); // Сортировка по дате

            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TransactionController();
