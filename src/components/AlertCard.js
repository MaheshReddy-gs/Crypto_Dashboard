import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

const AlertCard = ({ title, content, variant = 'info' }) => {
    // Define styles based on variant
    const getStyles = () => {
        switch (variant) {
            case 'success':
                return {
                    container: 'bg-green-50 dark:bg-green-900/20 border-green-500',
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    title: 'text-green-700 dark:text-green-400',
                    content: 'text-green-600 dark:text-green-300'
                };
            case 'error':
                return {
                    container: 'bg-red-50 dark:bg-red-900/20 border-red-500',
                    icon: <XCircle className="w-5 h-5 text-red-500" />,
                    title: 'text-red-700 dark:text-red-400',
                    content: 'text-red-600 dark:text-red-300'
                };
            case 'warning':
                return {
                    container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500',
                    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
                    title: 'text-yellow-700 dark:text-yellow-400',
                    content: 'text-yellow-600 dark:text-yellow-300'
                };
            case 'info':
            default:
                return {
                    container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
                    icon: <Info className="w-5 h-5 text-blue-500" />,
                    title: 'text-blue-700 dark:text-blue-400',
                    content: 'text-blue-600 dark:text-blue-300'
                };
        }
    };

    const styles = getStyles();

    return (
        <div className={`p-6 rounded-lg shadow-md border-l-4 ${styles.container}`}>
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                    {styles.icon}
                </div>
                <div>
                    <h3 className={`text-lg font-semibold mb-2 ${styles.title}`}>{title}</h3>
                    <p className={`text-sm ${styles.content}`}>{content}</p>
                </div>
            </div>
        </div>
    );
};

export { AlertCard }; 