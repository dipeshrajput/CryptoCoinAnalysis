import Chip from "@/ui/Chip";
import {
  CloseIcon,
  DownArrowIcon,
  ShareIcon,
  UpArrowIcon,
} from "../../../public/assets/icons";
import NextImage from "next/image";
import { changeHighLow } from "@/utils/changeHighLow";
import MarketStatCard from "@/components/CoinDetails/MarketStatCard";
import CoinDetailsChart from "./CoinDetailsChart";
import useGetCoinDetail from "@/hooks/apis/useGetCoinDetail";
import { useEffect } from "react";
import CoinSentimentAnalysis from "./CoinSentimentAnalysis";

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

interface Props {
  closeModal: () => void;
}

const CoinDetailsModal = ({ closeModal }: Props) => {
  const { data, status } = useGetCoinDetail("bitcoin");

  useEffect(() => {
    console.log("data ->", data);
  }, [status]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 ">
      {/** modal body*/}
      <div className="fixed right-0 bg-white w-2/3 h-full px-8 py-6 flex flex-col gap-4">
        {/**header */}
        <div className="flex flex-row justify-between">
          <p className="text-xl font-medium">COIN DETAILS</p>
          <button
            onClick={closeModal}
            className="rounded-full w-8 h-8 bg-neutral-200 flex justify-center items-center active:scale-90"
          >
            <CloseIcon className="w-5 h-5 text-neutral-700 gropu-active:scale-95" />
          </button>
        </div>
        {/**header */}
        <div className="w-full h-0 border border-t border-dashed" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <NextImage
                src={sampleCoinData.iconUrl}
                className="w-7 h-7"
                height={0}
                width={0}
                alt="coin_image"
              />
              <p className="text-xl font-medium text-neutral-700">Bitcoin</p>{" "}
              <p className="text-base text-neutral-400 font-medium">
                {" "}
                (BTC/USD)
              </p>
            </div>
            <Chip>
              <p className="text-sm">RANK #5</p>
            </Chip>
            <Chip>
              <p className="text-sm">USD</p>
            </Chip>
            <Chip className="flex justify-center items-center py-1.5">
              <ShareIcon
                onClick={() => {
                  window.open(sampleCoinData.websiteUrl, "_blank");
                }}
              />
            </Chip>
          </div>

          <div className="flex flex-row items-center gap-4">
            <p className="text-2xl font-medium">
              {sampleCoinData.btcPrice} BTC
            </p>
            {changeHighLow(sampleCoinData.change) === "high" ? (
              <p className="text-green-500 ">{sampleCoinData.change}</p>
            ) : (
              <p className="text-red-500 ">{sampleCoinData.change}</p>
            )}
            {changeHighLow(sampleCoinData.change) === "high" ? (
              <UpArrowIcon className="text-green-500 w-8 h-8" />
            ) : (
              <DownArrowIcon className="text-red-500 w-8 h-8" />
            )}
          </div>
        </div>

        {/** chart */}

        <CoinDetailsChart />

        {/** chart */}

        <CoinSentimentAnalysis />

        {/** market stats */}
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium">MARKET STATS</p>
          <div className="grid grid-cols-2 gap-6">
            <MarketStatCard
              statHeader="MARKET CAP"
              statValue="$348.0B"
              statValue2="35% of crypto market"
            />
            <MarketStatCard
              statHeader="VOLUME (24H)"
              statValue="$25.5B"
              statValue2="35% of crypto market"
            />
            <MarketStatCard
              statHeader="CIRCULATING SUPPLY"
              statValue="$348.0B"
              statValue2="35% of crypto market"
            />
            <MarketStatCard statHeader="ALL TIME HIGH" statValue="$68,789.63" />
            <MarketStatCard
              statHeader="PRICE CHANGE (24H)"
              statValue="$+12.5"
            />
          </div>
        </div>
        {/** market stats */}
      </div>
      {/** modal body */}
    </div>
  );
};

export default CoinDetailsModal;
