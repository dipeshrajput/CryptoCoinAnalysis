 import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryLine } from "victory";
import { InfoFilledIcon } from "../../../public/assets/icons";

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
    } else if (macd[0]?.valueMACD > macd[0]?.valueMACDSignal && rsi?.value > 70) {
      setBuySellSignalStrength(0.3);
    } else {
      setBuySellSignalStrength(0.5);
    }
  };

  const macdChart = () => {
    const reversedMacd = [...macd].reverse();
    let idx = 0;
    for (let obj of reversedMacd) {
      obj.backtrack = idx;
      idx = idx + 1;
    }
    return reversedMacd;
  };

  useEffect(() => {
    buySellSignalLogic();
  }, [macd, rsi, ma, price]);

  useEffect(() => {
    const animateGaugeChart = () => {
      const interval = setInterval(() => {
        if (buySellSignalStrength === 0.8) {
          setBuySellSignalStrength((prevStrength) =>
            prevStrength < 0.8 ? prevStrength + 0.1 : prevStrength
          );
        } else if (buySellSignalStrength === 0.2) {
          setBuySellSignalStrength((prevStrength) =>
            prevStrength < 0.2 ? prevStrength + 0.1 : prevStrength
          );
        } else if (buySellSignalStrength === 0.3) {
          setBuySellSignalStrength((prevStrength) =>
            prevStrength < 0.3 ? prevStrength + 0.1 : prevStrength
          );
        } else {
          clearInterval(interval);
        }
      }, 200);
    };

    animateGaugeChart();
  }, [buySellSignalStrength]);

  return (
    <div>
      <p className="text-lg font-medium">COIN ANALYSIS</p>

      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <div className="bg-white shadow-lg rounded-xl shadow-neutral-200 p-4">
          <div className="w-full">
            <p
