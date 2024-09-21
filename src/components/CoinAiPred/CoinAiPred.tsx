// pages/index.tsx

import React from 'react';
import CoinAiChart, { AiDataType } from './CoinAiChart';

interface CoinAiPredProps {
    aiData: AiDataType | null;
}

const CoinAiPred: React.FC<CoinAiPredProps> = ({ aiData }) => {
    return (
        <div className="py-4 flex flex-col gap-4">
            <CoinAiChart data={aiData} />
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-500 rounded">
                <p className="text-xs font-semibold py-2">Disclaimer</p>
                <p className="mt-1 text-[10px]">
                    The data shown in this chart is generated using AI algorithms and is purely for informational purposes. 
                    This is <span className="font-bold">not financial advice</span>. Please do your own research before making any financial decisions.
                </p>
            </div>
        </div>
    );
};

export default CoinAiPred;
