const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Кто запросил отчет
    reportType: { type: String, enum: ['transaction_summary', 'account_balance', 'user_activity'], required: true },
    generatedAt: { type: Date, default: Date.now }, // Дата генерации
    data: { type: Object, required: true } // Данные отчета
}, { timestamps: true });

module.exports = model('Report', ReportSchema);
