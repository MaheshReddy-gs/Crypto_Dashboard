import React from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const ComposedChartComponent = ({ data, title }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
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
                            dataKey="pv"
                            barSize={20}
                            fill="#8884d8"
                            radius={[4, 4, 0, 0]}
                            name="Page Views"
                        />
                        <Line
                            type="monotone"
                            dataKey="uv"
                            stroke="#ff7300"
                            strokeWidth={2}
                            name="Unique Visitors"
                        />
                        <Bar
                            dataKey="value"
                            barSize={20}
                            fill="#82ca9d"
                            radius={[4, 4, 0, 0]}
                            name="Value"
                        />
                        <Line
                            type="monotone"
                            dataKey="amt"
                            stroke="#0088fe"
                            strokeWidth={2}
                            name="Amount"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export { ComposedChartComponent }; 