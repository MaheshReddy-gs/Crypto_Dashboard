import React from 'react';

const InfoCard = ({ title, content }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{content}</p>
        </div>
    );
};

export { InfoCard }; 