import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import TransactionPage from './pages/TransactionPage';
import AccountDetail from "./components/AccountDetail.tsx";
const App: React.FC = () => {
    const token = localStorage.getItem('token') || ''; // Get the token from localStorage

    // Protected Route component to check if the user is authenticated
    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        if (!token) {
            // If no token, redirect to the login page
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/account/:id" element={<AccountDetail />} /> {/* Новый маршрут */}

                <Route path="/login" element={<LoginPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
            </Routes>
        </Router>
    );
};

export default App;
