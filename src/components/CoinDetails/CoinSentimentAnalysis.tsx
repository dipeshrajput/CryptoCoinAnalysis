import dynamic from "next/dynamic";
import React from "react";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

const CoinSentimentAnalysis = () => {
  return (
    <div>
      <p className="text-lg font-medium">COIN SENTIMENT</p>
      <div className="m-2 w-64">
        <div className="w-full">
          <p className="text-center text-indigo-600 font-medium">Neutral</p>
          <GaugeChart
            id="gauge-chart"
            style={{ height: "100%", width: "100%" }}
            arcWidth={0.02}
            colors={["#78716c"]}
            nrOfLevels={3}
            percent={0.85}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-red-500">SELL</p>
          <p className="text-sm text-green-500">BUY</p>
        </div>
      </div>
    </div>
  );
};

export default CoinSentimentAnalysis;
