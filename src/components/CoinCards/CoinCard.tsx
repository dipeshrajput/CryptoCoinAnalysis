import { Area, AreaChart, Line, LineChart, XAxis, YAxis } from "recharts";
import { DownArrowIcon, UpArrowIcon } from "../../../public/assets/icons";
import NextImage from "next/image";
import { changeHighLow } from "@/utils/changeHighLow";
import { useEffect, useState } from "react";

const sampleCoinData = {
  uuid: "Qwsogvtv82FCd",
  symbol: "BTC",
  name: "Bitcoin",
  description: "Bitcoin is the first decentralized digital currency.",
  color: "#f7931A",
  iconUrl: "https://cdn.coinranking.com/Sy33Krudb/btc.svg",
  websiteUrl: "https://bitcoin.org",
  links: [
    {
      name: "Bitcoin",
      url: "https://www.reddit.com/r/Bitcoin/",
      type: "reddit",
    },
  ],
  supply: {
    confirmed: true,
    supplyAt: 1640757180,
    circulating: "17009275",
    total: "17009275",
    max: "21000000",
  },
  "24hVolume": "6818750000",
  marketCap: "159393904304",
  fullyDilutedMarketCap: "196790985529",
  price: "9370.9993109108",
  btcPrice: "1",
  priceAt: 1640757180,
  change: "-0.52",
  rank: 1,
  numberOfMarkets: 9800,
  numberOfExchanges: 190,
  sparkline: [
    "9515.0454185372",
    "9540.1812284677",
    "9554.2212643043",
    "9593.571539283",
    "9592.8596962985",
    "9562.5310295967",
    "9556.7860427046",
    "9388.823394515",
    "9335.3004209165",
    "9329.4331700521",
    "9370.9993109108",
  ],
  allTimeHigh: {
    price: "19500.471361532",
    timestamp: 1513555200,
  },
  coinrankingUrl: "https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc",
  lowVolume: false,
  listedAt: 1483228800,
  notices: [
    {
      type: "MESSAGE",
      value: "Lorem ipsum dolor sit amet",
    },
  ],
  tags: ["staking", "layer-1"],
};

const dummyChartData = [
  70.27083911570767, 79.78699157916402, 85.10240102818926, 100,
  99.73050375582538, 88.24839050203764, 86.07339907280029, 22.484512430295116,
  2.2212792792971747, 0, 15.736502417172307,
];

interface CoinCardProps {
  coinName: string;
  coinImage: string;
  priceChange24hr: string;
  coinPrice: string;
  allTimeHigh: string;
  sparkLine7d: Array<string>;
}

export default function CoinCard({
  coinName,
  coinImage,
  coinPrice,
  allTimeHigh,
  priceChange24hr,
  sparkLine7d,
}: CoinCardProps) {
  const [sparkLineChartData, setSparkLineChartData] = useState([
    { x: 0, y: 1 },
  ]);
  const sparkLineFormatData = () => {
    const values = sparkLine7d.map(parseFloat);
    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);
    const range = maxValue - minValue;

    const normalizedValues = values.map((value) => (value - minValue) / range);

    const factor = 10; // Adjust this value to scale the line up or down
    const scaledValues = normalizedValues.map((value) => value * factor);
    console.log("scaleddValues ->", scaledValues);
    const chartData = scaledValues.map((value, index) => ({
      x: index,
      y: value,
    }));
    setSparkLineChartData(chartData);
    return chartData;
  };

  useEffect(() => {
    sparkLineFormatData();
  }, []);

  return (
    <div className="max-w-xs h-40 p-3 rounded-xl shadow-lg shadow-zinc-200 flex flex-row items-center justify-between gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-2">
          <NextImage
            className="h-8 w-8"
            src={coinImage}
            width={0}
            height={0}
            alt={`coin_image_${coinName}`}
          />
          <p className="font-medium text-lg text-neutral-700">{coinName}</p>
        </div>
        <p className="font-medium text-xl">{coinPrice} $</p>
        <div className="flex flex-row items-center gap-3">
          <p className="text-sm text-neutral-600 font-medium">
            ATH: ${parseFloat(allTimeHigh).toFixed(2)}
          </p>
          <div className="flex flex-row items-center gap-1">
            {changeHighLow(priceChange24hr) === "high" ? (
              <UpArrowIcon className="text-green-500 " />
            ) : (
              <DownArrowIcon className="text-red-500" />
            )}
            {changeHighLow(priceChange24hr) === "high" ? (
              <p className="text-base text-green-500">
                +{parseFloat(priceChange24hr).toFixed(2)}
              </p>
            ) : (
              <p className="text-base text-red-500">
                {parseFloat(priceChange24hr).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-lg">
        <AreaChart height={100} width={100} data={sparkLineChartData}>
          <Area
            type="monotone"
            dataKey="y"
            stroke={
              changeHighLow(priceChange24hr) === "high" ? "#22c55e" : "#ef4444"
            }
            strokeWidth={1}
            fill={
              changeHighLow(priceChange24hr) === "high" ? "#4ade80" : "#f87171"
            }
            dot={false}
          />
        </AreaChart>
      </div>
    </div>
  );
}
