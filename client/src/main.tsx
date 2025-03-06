import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // подключение стилей (если вы используете Tailwind CSS, например)
import App from './App';  // импорт основного компонента приложения

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // получаем элемент с id 'root'

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
