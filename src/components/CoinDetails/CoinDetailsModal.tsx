import Chip from "@/ui/Chip";
import {
  CloseIcon,
  DownArrowIcon,
  LoadingIcon,
  ShareIcon,
  UpArrowIcon,
} from "../../../public/assets/icons";
import NextImage from "next/image";
import { changeHighLow } from "@/utils/changeHighLow";
import MarketStatCard from "@/components/CoinDetails/MarketStatCard";
import CoinDetailsChart from "./CoinDetailsChart";
import useGetCoinDetail from "@/hooks/apis/useGetCoinDetail";
import { useContext, useEffect, useState } from "react";
import CoinSentimentAnalysis from "./CoinSentimentAnalysis";
import { GlobalContext } from "@/context/globalContext";
import { highOrLow } from "@/utils/highOrLow";

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
  const { coinDetailIdState } = useContext(GlobalContext);
  const [coinId, _] = coinDetailIdState!;
  const { data: coinData, status: coinDataStatus } = useGetCoinDetail(coinId);

  const [coinDetails, setCoinDetails] = useState<any>({});

  useEffect(() => {
    if (coinDataStatus === "success") {
      console.log("coin data !>", coinData);
      setCoinDetails(coinData?.data);
    }
  }, [coinDataStatus, coinData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 ">
      {coinDataStatus === "loading" && (
        <div className="fixed right-0 bg-white w-2/3 h-full px-8 py-6 flex flex-col justify-center items-center overflow-scroll">
          <div className="animate animate-spin">
            <LoadingIcon className="text-2xl text-indigo-400" />
          </div>
        </div>
      )}

      {/** modal body */}
      {coinDataStatus === "success" && (
        <div className="fixed right-0 bg-white w-2/3 h-full px-8 py-6 flex flex-col gap-4 overflow-scroll">
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
                  src={coinDetails?.image?.small}
                  className="w-7 h-7"
                  height={0}
                  width={0}
                  alt="coin_image"
                />
                <p className="text-xl font-medium text-neutral-700">
                  {coinDetails?.name}
                </p>{" "}
                <p className="text-base text-neutral-400 font-medium">
                  {" "}
                  ({coinDetails?.symbol?.toUpperCase()}/USD)
                </p>
              </div>
              <Chip>
                <p className="text-sm">RANK #{coinDetails?.market_cap_rank}</p>
              </Chip>
              <Chip>
                <p className="text-sm">USD</p>
              </Chip>
              <Chip className="flex justify-center items-center py-1.5">
                <ShareIcon
                  onClick={() => {
                    window.open(coinDetails?.links?.homepage?.[0], "_blank");
                  }}
                />
              </Chip>
            </div>

            <div className="flex flex-row items-center gap-4">
              <p className="text-2xl font-medium">
                {coinDetails?.market_data?.current_price?.usd} USD
              </p>
              {highOrLow(coinDetails?.market_data?.price_change_24h) ===
              "high" ? (
                <p className="text-green-500 ">
                  +{coinDetails?.market_data?.price_change_percentage_24h}
                </p>
              ) : (
                <p className="text-red-500 ">
                  {coinDetails?.market_data?.price_change_percentage_24h}
                </p>
              )}
              {highOrLow(coinDetails?.market_data?.price_change_24h) ===
              "high" ? (
                <UpArrowIcon className="text-green-500 w-8 h-8" />
              ) : (
                <DownArrowIcon className="text-red-500 w-8 h-8" />
              )}
            </div>
          </div>

          {/** chart */}

          <CoinDetailsChart id={coinId} />

          {/** chart */}

          <CoinSentimentAnalysis symbol={coinDetails?.symbol} />

          {/** market stats */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium">MARKET STATS</p>
            <div className="grid grid-cols-2 gap-6">
              <MarketStatCard
                statHeader="MARKET CAP"
                statValue={coinDetails?.market_data?.market_cap?.usd}
                statValue2="The total market value of a cryptocurrencies circulating supply.It's analogoues to the free-float capitalization in the free-market"
              />
              <MarketStatCard
                statHeader="Total Volume"
                statValue={coinDetails?.market_data?.total_volume?.usd}
              />
              <MarketStatCard
                statHeader="CIRCULATING SUPPLY"
                statValue={coinDetails?.market_data?.circulating_supply}
                statValue2={
                  <p>
                    &quot;Circulating supply&quot; refers to the total number of
                    units of a specific cryptocurrency that are currently in
                    circulation and available for trading on the market. This
                    excludes any coins or tokens that are locked or held by the
                    project team or reserved for other purposes.
                  </p>
                }
              />
              <MarketStatCard
                statHeader="ALL TIME HIGH"
                statValue={coinDetails?.market_data?.ath["usd"]}
                statValue2={
                  <p>
                    &quot;All Time High &quot;refers to the highest price point
                    that a particular cryptocurrency has ever reached since its
                    inception. This metric can be used to measure the
                    cryptocurrency&apos;s performance over time and to gauge its
                    potential for future growth. All Time Highs are often
                    referenced in news articles, investor discussions, and price
                    analysis reports.
                  </p>
                }
              />
              <MarketStatCard
                statHeader="PRICE CHANGE (24H)"
                statValue={`$${coinDetails?.market_data?.price_change_24h}`}
                statValue2={`Price Change (24H)" is the percentage increase or decrease in a cryptocurrency's value over the past 24 hours `}
              />
            </div>
          </div>
          {/** market stats */}
        </div>
      )}

      {/** modal body */}
    </div>
  );
};

export default CoinDetailsModal;
