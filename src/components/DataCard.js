import React from 'react';

const DataCard = ({
    title,
    value,
    change,
    icon,
    isLoading = false,
    prefix = '',
    suffix = '',
    description = ''
}) => {
    // Determine if the change is positive, negative, or neutral
    const isPositive = change > 0;
    const isNegative = change < 0;
    const changeColor = isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-gray-500';
    const changeIcon = isPositive ? '↑' : isNegative ? '↓' : '-';

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
                    <div className="mt-1 flex items-baseline">
                        {isLoading ? (
                            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : (
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {prefix}{value.toLocaleString()}{suffix}
                            </h2>
                        )}
                    </div>
                </div>
                {icon && <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">{icon}</div>}
            </div>
            {(change !== undefined || description) && (
                <div className="flex items-center text-sm">
                    {change !== undefined && (
                        <span className={`flex items-center ${changeColor} mr-2`}>
                            <span>{changeIcon}</span>
                            <span className="ml-1">{Math.abs(change).toFixed(1)}%</span>
                        </span>
                    )}
                    {description && (
                        <span className="text-gray-500 dark:text-gray-400">{description}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export { DataCard }; 