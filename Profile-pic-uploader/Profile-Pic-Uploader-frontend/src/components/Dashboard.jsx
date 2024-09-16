import React, { useState } from 'react';
import 'flowbite';
import { SunIcon, MoonIcon, LogoutIcon } from '@heroicons/react/outline';

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <div className={`flex h-screen w-screen ${darkMode ? 'dark' : ''}`}>
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0">
                <div className="p-4">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <a href="#home" className="block text-gray-700 dark:text-gray-300">Home</a>
                        </li>
                        <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <a href="#profile" className="block text-gray-700 dark:text-gray-300">Profile</a>
                        </li>
                        <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <a href="#settings" className="block text-gray-700 dark:text-gray-300">Settings</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-auto">
                {/* Navbar */}
                <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Welcome to the Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 p-2 rounded"
                        >
                            {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                        </button>
                        <button className="text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 p-2 rounded">
                            <LogoutIcon className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard Content</h2>
                    <p className="text-gray-700 dark:text-gray-300">This is where your main content will go.</p>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;