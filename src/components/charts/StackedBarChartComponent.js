import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const StackedBarChartComponent = ({ data, title, dataKeys = { positive: 'profit', negative: 'loss' } }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            className="text-xs"
                        />
                        <YAxis stroke="#64748b" className="text-xs" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#f8fafc',
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: '12px',
                                color: '#64748b',
                            }}
                        />
                        <Bar
                            dataKey={dataKeys.positive}
                            stackId="a"
                            fill="#22c55e"
                            radius={[4, 4, 0, 0]}
                            name="Profit"
                        />
                        <Bar
                            dataKey={dataKeys.negative}
                            stackId="a"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                            name="Loss"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export { StackedBarChartComponent }; 