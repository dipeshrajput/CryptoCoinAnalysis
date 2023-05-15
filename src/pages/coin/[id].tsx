import { GlobalContext } from "@/context/globalContext";
import useGetCoinDetail from "@/hooks/apis/useGetCoinDetail";
import { useContext, useEffect, useState } from "react";
import {
  BackArrowIcon,
  DownArrowIcon,
  LoadingIcon,
  ShareIcon,
  UpArrowIcon,
} from "../../../public/assets/icons";
import NextImage from "next/image";
import MarketStatCard from "@/components/CoinDetails/MarketStatCard";
import CoinDetailsChart from "@/components/CoinDetails/CoinDetailsChart";
import CoinSentimentAnalysis from "@/components/CoinDetails/CoinSentimentAnalysis";
import { highOrLow } from "@/utils/highOrLow";
import Chip from "@/ui/Chip";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const id = context.params?.id;
    const symbol = context.query.symbol as string;

    const apiSymbol = `${symbol?.toUpperCase()}`;
    const coinDetailsResponse = await axios(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const coinMacdResponse = await axios(
      `https://api.taapi.io/macd?secret=${process.env.NEXT_PUBLIC_TAAPI_API_KEY}&exchange=binance&symbol=${apiSymbol}/USDT&interval=15m&backtracks=10`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    const coinRSIResponse = await axios(
      `https://api.taapi.io/rsi?secret=${process.env.NEXT_PUBLIC_TAAPI_API_KEY}&exchange=binance&symbol=${apiSymbol}/USDT&interval=15m&period=9`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    const coinMAResponse = await axios(
      `https://api.taapi.io/ma?secret=${process.env.NEXT_PUBLIC_TAAPI_API_KEY}&exchange=binance&symbol=${apiSymbol}/USDT&interval=15m&period=200`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    return {
      props: {
        coinInfo: coinDetailsResponse?.data,
        macd: coinMacdResponse?.data,
        rsi: coinRSIResponse?.data,
        ma: coinMAResponse?.data,
      },
    };
  } catch (err: any) {
    return {
      props: {
        error: {
          message: "An Error Occurred",
          showMessage:
            "Unable To Find Coin Details, Please Check Your Coin Symbols",
        },
      },
    };
  }
}

interface CoinDetailsPageProps {
  coinInfo: any;
  macd: any;
  rsi: any;
  ma: any;
  error?: any;
}

export default function CoinDetailsPage({
  error,
  coinInfo,
  macd,
  rsi,
  ma,
}: CoinDetailsPageProps) {
  const router = useRouter();
  if (error) {
    return (
      <div className="max-w-4xl mt-10  ml-auto mr-auto bg-white shadow-xl shadow-neutral-200 px-8 py-6 rounded-xl ">
        <p className="text-red-500 font-medium">{error?.showMessage}</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mt-10  ml-auto mr-auto bg-white shadow-xl shadow-neutral-200 px-8 py-6 rounded-xl ">
      {/** modal body */}
      {/**header */}
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <BackArrowIcon />
        </button>
        <p className="text-xl font-medium">COIN DETAILS</p>
      </div>
      {/**header */}
      <div className="w-full mt-2 mb-4 h-0 border border-t border-dashed" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <div className="flex items-center gap-2">
            <NextImage
              src={coinInfo?.image?.small}
              className="w-7 h-7"
              height={0}
              width={0}
              alt="coin_image"
            />
            <p className="text-xl font-medium text-neutral-700">
              {coinInfo?.name}
            </p>{" "}
            <p className="text-base text-neutral-400 font-medium">
              {" "}
              ({coinInfo?.symbol?.toUpperCase()}/USD)
            </p>
          </div>
          <Chip>
            <p className="text-sm">RANK #{coinInfo?.market_cap_rank}</p>
          </Chip>
          <Chip>
            <p className="text-sm">USD</p>
          </Chip>
          <Chip className="flex justify-center items-center py-1.5">
            <ShareIcon
              onClick={() => {
                window.open(coinInfo?.links?.homepage?.[0], "_blank");
              }}
            />
          </Chip>
        </div>

        <div className="flex flex-row items-center gap-4">
          <p className="text-2xl font-medium">
            {coinInfo?.market_data?.current_price?.usd} USD
          </p>
          {highOrLow(coinInfo?.market_data?.price_change_24h) === "high" ? (
            <p className="text-green-500 ">
              +{coinInfo?.market_data?.price_change_percentage_24h}
            </p>
          ) : (
            <p className="text-red-500 ">
              {coinInfo?.market_data?.price_change_percentage_24h}
            </p>
          )}
          {highOrLow(coinInfo?.market_data?.price_change_24h) === "high" ? (
            <UpArrowIcon className="text-green-500 w-8 h-8" />
          ) : (
            <DownArrowIcon className="text-red-500 w-8 h-8" />
          )}
        </div>
      </div>

      {/** chart */}

      <CoinDetailsChart id={coinInfo?.id} />

      {/** chart */}

      <CoinSentimentAnalysis
        price={coinInfo?.market_data?.current_price?.usd}
        macd={macd}
        rsi={rsi}
        ma={ma}
        symbol={coinInfo?.symbol}
      />

      {/** market stats */}
      <div className="flex flex-col gap-3">
        <p className="text-lg font-medium">MARKET STATS</p>
        <div className="grid grid-cols-2 gap-6">
          <MarketStatCard
            statHeader="MARKET CAP"
            statValue={coinInfo?.market_data?.market_cap?.usd}
            statValue2="The total market value of a cryptocurrencies circulating supply.It's analogoues to the free-float capitalization in the free-market"
          />
          <MarketStatCard
            statHeader="Total Volume"
            statValue={coinInfo?.market_data?.total_volume?.usd}
          />
          <MarketStatCard
            statHeader="CIRCULATING SUPPLY"
            statValue={coinInfo?.market_data?.circulating_supply}
            statValue2={`"Circulating supply" refers to the total number of
                units of a specific cryptocurrency that are currently in
                circulation and available for trading on the market. This
                excludes any coins or tokens that are locked or held by the
                project team or reserved for other purposes.
                `}
          />
          <MarketStatCard
            statHeader="ALL TIME HIGH"
            statValue={coinInfo?.market_data?.ath["usd"]}
            statValue2={` 
               "All Time High" refers to the highest price point that
                a particular cryptocurrency has ever reached since its
                inception. This metric can be used to measure the
                cryptocurrency's performance over time and to gauge its
                potential for future growth. All Time Highs are often referenced
                in news articles, investor discussions, and price analysis
                reports.
             `}
          />
          <MarketStatCard
            statHeader="ALL TIME LOW"
            statValue={coinInfo?.market_data?.atl["usd"]}
            statValue2={`An all-time low (ATL) refers to the lowest price a cryptocurrency has hit during its trading history.`}
          />
          <MarketStatCard
            statHeader="PRICE CHANGE (24H)"
            statValue={`$${coinInfo?.market_data?.price_change_24h}`}
            statValue2={`Price Change (24H)" is the percentage increase or decrease in a cryptocurrency's value over the past 24 hours `}
          />
        </div>
      </div>
      {/** market stats */}

      {/** modal body */}
    </div>
  );
}
