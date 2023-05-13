import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getEMA = async (symbol: string) => {
  try {
    const res = await axios(
      `https://api.taapi.io/ema?secret=${process.env.NEXT_PUBLIC_TAAPI_API_KEY}&exchange=binance&symbol=${symbol}/USDT&interval=4h&period=9&backtracks=10`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default function useGetEMA(symbol: string) {
  return useQuery({
    queryKey: ["getEMA", symbol],
    queryFn: () => getEMA(symbol),
  });
}
