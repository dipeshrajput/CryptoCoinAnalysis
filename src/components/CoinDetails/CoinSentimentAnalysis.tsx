import useGetEMA from "@/hooks/apis/useGetEMA";
import useGetMACD from "@/hooks/apis/useGetMACD";
import useGetRSI from "@/hooks/apis/useGetRSI";
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
import useGetMA from "@/hooks/apis/useGetMA";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

interface Props {
  symbol: any;
}

const sampleEmaData = [
  {
    value: 27491.151964409724,
    backtrack: 0,
  },
  {
    value: 27573.097455512154,
    backtrack: 1,
  },
  {
    value: 27614.96931939019,
    backtrack: 2,
  },
  {
    value: 27656.194149237737,
    backtrack: 3,
  },
  {
    value: 27708.51768654717,
    backtrack: 4,
  },
  {
    value: 27735.959608183963,
    backtrack: 5,
  },
  {
    value: 27746.884510229953,
    backtrack: 6,
  },
  {
    value: 27645.30563778744,
    backtrack: 7,
  },
  {
    value: 27637.3595472343,
    backtrack: 8,
  },
  {
    value: 27661.134434042877,
    backtrack: 9,
  },
];

const sampleMacdData = [
  {
    valueMACD: -284.96249764811,
    valueMACDSignal: -273.6814420318941,
    valueMACDHist: -11.281055616215895,
    backtrack: 0,
  },
  {
    valueMACD: -258.2646847111246,
    valueMACDSignal: -270.86117812784016,
    valueMACDHist: 12.596493416715589,
    backtrack: 1,
  },
  {
    valueMACD: -255.81584442120948,
    valueMACDSignal: -274.0103014820191,
    valueMACDHist: 18.19445706080961,
    backtrack: 2,
  },
  {
    valueMACD: -253.49611235049815,
    valueMACDSignal: -278.5589157472215,
    valueMACDHist: 25.062803396723325,
    backtrack: 3,
  },
  {
    valueMACD: -246.52531087332682,
    valueMACDSignal: -284.8246165964023,
    valueMACDHist: 38.29930572307546,
    backtrack: 4,
  },
  {
    valueMACD: -249.50330155703705,
    valueMACDSignal: -294.3994430271712,
    valueMACDHist: 44.896141470134125,
    backtrack: 5,
  },
  {
    valueMACD: -259.19617982523414,
    valueMACDSignal: -305.6234783947047,
    valueMACDHist: 46.427298569470565,
    backtrack: 6,
  },
  {
    valueMACD: -314.72976365372597,
    valueMACDSignal: -317.23030303707236,
    valueMACDHist: 2.5005393833463927,
    backtrack: 7,
  },
  {
    valueMACD: -332.5562686325866,
    valueMACDSignal: -317.855437882909,
    valueMACDHist: -14.700830749677607,
    backtrack: 8,
  },
  {
    valueMACD: -336.7440438073136,
    valueMACDSignal: -314.18023019548957,
    valueMACDHist: -22.563813611824003,
    backtrack: 9,
  },
];

const CoinSentimentAnalysis = ({ symbol = "btc" }: Props) => {
  const { data: coinMA, status: coinMAStatus } = useGetMA(symbol.toUpperCase());
  const { data: coinMACD, status: coinMACDStatus } = useGetMACD(
    symbol.toUpperCase()
  );

  const [macdData, setMacdData] = useState([]);

  const { data: coinRSI, status: coinRSIStatus } = useGetRSI(
    symbol.toUpperCase()
  );
  const [buySellSignalStrength, setBuySellSignalStrength] = useState(0.5);

  const buySellSignalLogic = () => {
    if (
      coinMACD?.data?.[0]?.valueMACD > coinMACD?.data?.[0]?.valueMACDSignal &&
      coinRSI?.data?.value < 70
    ) {
      setBuySellSignalStrength(0.75);
    } else if (
      coinMACD?.data?.[0]?.valueMACD < coinMACD?.data?.[0]?.valueMACDSignal &&
      coinRSI?.data?.value > 80
    ) {
      setBuySellSignalStrength(0.25);
    } else {
      setBuySellSignalStrength(0.5);
    }
  };
  useEffect(() => {
    if (
      coinMAStatus === "success" &&
      coinMACDStatus === "success" &&
      coinRSIStatus === "success"
    ) {
      console.log("macd  >>>", coinMACD);
      setMacdData(coinMACD?.data?.reverse());
      console.log("ema >>>", coinMA);
      console.log("rsi >>>", coinRSI);
      buySellSignalLogic();
    }
  }, [coinMAStatus, coinMACDStatus, coinRSIStatus, coinMACD, coinMA, coinRSI]);

  return (
    <div>
      <p className="text-lg font-medium">COIN ANALYSIS</p>

      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <div className="bg-white shadow-lg rounded-xl shadow-neutral-200 p-4">
          <div className="w-full ">
            <p className="text-center text-indigo-600 font-medium">Neutral</p>
            <GaugeChart
              //@ts-ignore
              id="gauge-chart"
              style={{ height: "100%", width: "100%" }}
              arcWidth={0.02}
              colors={["#78716c"]}
              nrOfLevels={3}
              percent={buySellSignalStrength}
              hideText
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-red-500">SELL</p>
            <p className="text-sm text-green-500">BUY</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl shadow-neutral-200 p-3">
          <div className="h-60 ">
            <VictoryChart padding={50}>
              <VictoryLine
                interpolation="natural"
                data={macdData}
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
                data={macdData}
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

        <div className="bg-white shadow-lg rounded-xl shadow-neutral-200 p-4">
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">
              MACD Signal Value: {coinMACD?.data?.[0]?.valueMACDSignal}
            </p>
            <p></p>
          </div>
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">
              MACD Value: {coinMACD?.data?.[0]?.valueMACD}
            </p>
            <p></p>
          </div>
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">RSI Value:{coinRSI?.data?.value} </p>
            <p></p>
          </div>
          <div className="flex flex-row items-center text-sm">
            <p className="font-medium">200 day MA: {coinMA?.data?.value}</p>
            <p></p>
          </div>
          <div className="mt-4">
            <p className="font-base">SAFE/RISKY INDICATOR:</p>
            <TooltipProvider>
              <Tooltip>
                <div className="flex flex-row gap-1 items-center">
                  <p>The coin is: SAFE</p>
                  <TooltipTrigger>
                    <InfoFilledIcon className="text-neutral-400" />
                  </TooltipTrigger>
                </div>
                <TooltipContent className="max-w-sm p-2 bg-neutral-100 rounded-md">
                  There are 4 parameters we are checking for coin safety 1. If
                  more than 80% of coins are released in circulation, there is
                  limited dilution coming down the pipeline. 2. Coin ranking
                  under top 100 crypto coins 3.White paper A legitimate crypto
                  project will usually have some kind of documentation. It may
                  have a subsection of the website called Docs, or it may have a
                  single PDF called a white paper 4.Look at the Contracts Now
                  we’re getting into some serious due diligence. If the coin you
                  are considering is a token or DeFi project, it will have one
                  or more smart contracts running on the blockchain.
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
