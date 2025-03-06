const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Владелец счета
    accountType: { type: String, enum: ['savings', 'checking'], required: true }, // Тип счета (сберегательный/расчетный)
    balance: { type: Number, required: true, default: 0 }, // Баланс
    currency: { type: String, default: 'тг' }, // Валюта счета
    accountNumber: { type: String, required: true, unique: true } // Номер счета
}, { timestamps: true });

module.exports = model('Account', AccountSchema);
