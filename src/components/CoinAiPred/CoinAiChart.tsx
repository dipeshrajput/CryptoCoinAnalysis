// components/BitcoinChart.tsx

import React from 'react';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export type AiDataType = {
    symbol: string;
    dates: string[];
    predicted: number[];
    historical: number[];
    lower_bound: number[];
    upper_bound: number[];
}

interface BitcoinChartProps {
    data: AiDataType | null;
}

const CoinAiChart: React.FC<BitcoinChartProps> = ({ data }) => {
    // Format data for Recharts
    const formattedData = data ? data.dates.map((date, index) => ({
        date,
        predicted: data.predicted[index],
        historical: data.historical[index],
        lower_bound: data.lower_bound[index],
        upper_bound: data.upper_bound[index],
    })) : [];

    return (
        <div className="flex flex-col gap-2">
            <h2>{data?.symbol || 'BTC-USD'} Price Prediction</h2>
            {data ? (
                <ResponsiveContainer width="100%" height={400} >
                    <ComposedChart data={formattedData} margin={{ right: 25, top: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={20}/>
                        <YAxis tick={{ fontSize: 10 }}  />
                        <Tooltip labelStyle={{ fontSize: 12 }} contentStyle={{ fontSize: 12 }}/>
                        <Legend wrapperStyle={{fontSize: 10 }} />
                        <Area type="monotone" dataKey="upper_bound" stroke="#8884d8" fill="rgba(136, 132, 216, 0.3)" name="Max price prediction" />
                        <Area type="monotone" dataKey="lower_bound" stroke="#82ca9d" fill="rgba(130, 202, 157, 0.3)" name="Min price prediction" />
                        <Line type="monotone" dataKey="predicted" stroke="#ff7300" name="Predicted Price" dot={<></>} />
                        <Line dataKey="historical" fill="#413ea0" name="Actual Price" dot={<></>} />
                    </ComposedChart>
                </ResponsiveContainer>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CoinAiChart;
