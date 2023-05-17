import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { InfoFilledIcon } from "../../../public/assets/icons";
import { reverse } from "dns";

const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

interface Props {
  rank: number;
  price: number;
  symbol: any;
  macd: any;
  rsi: any;
  ma: any;
}

const CoinSentimentAnalysis = ({
  symbol = "btc",
  rank,
  price,
  macd,
  rsi,
  ma,
}: Props) => {
  const [buySellSignalStrength, setBuySellSignalStrength] = useState(0.0);

  const buySellSignalLogic = () => {
    if (
      macd[0]?.valueMACD > macd[0]?.valueMACDSignal &&
      rsi?.value < 70 &&
      ma?.value < price
    ) {
  
      setBuySellSignalStrength(0.8);
    } else if (
      macd[0]?.valueMACD < macd[0]?.valueMACDSignal &&
      rsi?.value > 30
    ) {
     
       setBuySellSignalStrength(0.2);
    }
      else if (
      macd[0]?.valueMACD > macd[0]?.valueMACDSignal &&
      rsi?.value > 70 
    )  {
       setBuySellSignalStrength(0.3);
    } else {
        
   
      setBuySellSignalStrength(0.5);
    }
  };

  const macdChart = () => {
    console.log("macd ->", macd);
    const reversedMacd = [...macd].reverse();
    let idx = 0;
    for (let obj of reversedMacd) {
      obj.backtrack = idx;
      idx = idx + 1;
    }
    console.log("reverse mac->", reversedMacd);
    return reversedMacd;
  };

 useEffect(() => {
    buySellSignalLogic();
  }, [macd, rsi, ma, price]);

  return (
    <div>
      <p className="text-lg font-medium">COIN ANALYSIS</p>

      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <div className="bg-white shadow-lg rounded-xl shadow-neutral-200 p-4">
          <div className="w-full ">
            <p className="text-center text-indigo-400 font-medium">NEUTRAL</p>
            <GaugeChart
              //@ts-ignore
              id="gauge-chart"
              style={{ height: "100%", width: "100%" }}
              arcWidth={0.1}
              colors={["#fecaca", "#bae6fd", "#dcfce7"]}
              nrOfLevels={3}
              needleColor="#fb7185"
              needleBaseColor="#ffe4e6"
              percent={buySellSignalStrength}
              hideText
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-red-500">SELL</p>
            <p className="text-base font-medium text-green-500">BUY</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl shadow-neutral-200 p-3">
          <div className="h-60 ">
            <VictoryChart padding={50}>
              <VictoryLine
                interpolation="natural"
                data={macdChart()}
                style={{
                  data: {
                    stroke: "#60a5fa",
                  },
                }}
                x="backtrack"
                y="valueMACD"
              />
              {/** orange line */}
              <VictoryLine
                interpolation="natural"
                data={macdChart()}
                style={{
                  data: {
                    stroke: "#fb923c",
                  },
                }}
                x="backtrack"
                y="valueMACDSignal"
              />
            </VictoryChart>
          </div>
          <p className="font-medium">
            MACD Value Line(blue) vs Signal Line(orange)
          </p>
        </div>

        <div className="h-52 bg-white shadow-lg rounded-xl shadow-neutral-200 p-4 flex flex-col items-start justify-center">
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">
              MACD Signal Value: {macd[0]?.valueMACDSignal}
            </p>
            <p></p>
          </div>
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">MACD Value: {macd[0]?.valueMACD}</p>
            <p></p>
          </div>
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">RSI Value: {rsi?.value} </p>
            <p></p>
          </div>
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">200 day MA: {ma?.value}</p>
            <p></p>
          </div>
          <div className="mt-4">
            <p className="font-base">SAFE/RISKY INDICATOR:</p>
            <TooltipProvider>
              <Tooltip>
                <div className="flex flex-row gap-1 items-center">
                  <p>The coin is: {rank <= 100 ? "SAFE" : "RISKY"}</p>
                  <TooltipTrigger>
                    <InfoFilledIcon className="text-neutral-400" />
                  </TooltipTrigger>
                </div>
                <TooltipContent className="max-w-sm p-2 bg-neutral-100 rounded-md">
                  There are 4 parameters we are checking for coin safety <br />
                  1. If more than 80% of coins are released in circulation,
                  there is limited dilution coming down the pipeline. <br />
                  2. Coin ranking under top 100 crypto coins <br />
                  3.White paper A legitimate crypto project will usually have
                  some kind of documentation. It may have a subsection of the
                  website called Docs, or it may have a single PDF called a
                  white paper <br />
                  4.Look at the Contracts Now we’re getting into some serious
                  due diligence. If the coin you are considering is a token or
                  DeFi project, it will have one or more smart contracts running
                  on the blockchain.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinSentimentAnalysis;
