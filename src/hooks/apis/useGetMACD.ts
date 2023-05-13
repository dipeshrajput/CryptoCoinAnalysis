import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getMACD = async (symbol: string) => {
  try {
    const res = await axios(
      `https://api.taapi.io/macd?secret=${process.env.NEXT_PUBLIC_TAAPI_API_KEY}&exchange=binance&symbol=${symbol}/USDT&interval=4h&backtracks=10`,
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

export default function useGetMACD(symbol: string) {
  return useQuery({
    queryKey: ["getMACD", symbol],
    queryFn: () => getMACD(symbol),
  });
}
