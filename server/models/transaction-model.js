const { Schema, model } = require('mongoose');

const TransactionSchema = new Schema({
    fromAccount: { type: Schema.Types.ObjectId, ref: 'Account', required: true }, // С какого счета
    toAccount: { type: Schema.Types.ObjectId, ref: 'Account', required: true }, // На какой счет
    amount: { type: Number, required: true }, // Сумма транзакции
    transactionType: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true }, // Тип операции
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }, // Статус
}, { timestamps: true });

module.exports = model('Transaction', TransactionSchema);
