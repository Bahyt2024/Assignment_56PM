const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const accountController = require('../controllers/accountController');
const transactionController = require('../controllers/transactionController');
const reportController = require('../controllers/reportController');

const { body } = require('express-validator');
const authMiddleWare = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/roleMiddleware'); // Проверка ролей

const router = new Router();

// 🟢 Аутентификация
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleWare, roleMiddleware(['admin']), userController.getUsers);

// 🏦 Управление счетами
router.post('/accounts', authMiddleWare, accountController.createAccount); // Создание счета
router.get('/accounts', authMiddleWare, accountController.getAccounts); // Получить все счета
router.get('/accounts/:id', authMiddleWare, accountController.getAccountById); // Получить счет по ID
router.delete('/accounts/:id', authMiddleWare, accountController.deleteAccount); // Удалить счет

// 💰 Операции с транзакциями
router.post('/transactions/deposit', authMiddleWare, transactionController.deposit);
router.post('/transactions/withdraw', authMiddleWare, transactionController.withdraw); // Снятие средств
router.post('/transactions/transfer', authMiddleWare, transactionController.transfer); // Перевод между счетами
router.get('/transactions/history/:accountId', authMiddleWare, transactionController.getTransactionHistory); // История транзакций

// 📊 Отчеты
router.get('/reports/account-statement/:accountId', authMiddleWare, reportController.getAccountStatement); // Выписка по счету
router.get('/reports/customer-transactions/:customerId', authMiddleWare, reportController.getCustomerTransactions); // Все транзакции клиента

module.exports = router;
