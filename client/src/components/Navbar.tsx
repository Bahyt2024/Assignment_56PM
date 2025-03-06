import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
                <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                <li><Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link></li>
                <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
