import React from 'react';

const BaseChart = ({ title, children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {title && <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>}
            <div className="h-80">
                {children}
            </div>
        </div>
    );
};

export { BaseChart }; 