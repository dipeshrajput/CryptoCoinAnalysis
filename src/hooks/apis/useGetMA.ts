import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getMA = async (symbol: string) => {
  try {
    const res = await axios(
      `https://api.taapi.io/ma?secret=${process.env.NEXT_PUBLIC_TAAPI_API_KEY}&exchange=binance&symbol=${symbol}/USDT&interval=4h&period=200`,
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

export default function useGetMA(symbol: string) {
  return useQuery({
    queryKey: ["getMA", symbol],
    queryFn: () => getMA(symbol),
  });
}
