import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getRSI = async (symbol: string) => {
  try {
    const res = await axios(
      `https://api.taapi.io/rsi?secret=${process.env.NEXT_PUBLIC_TAAPI_API_KEY}&exchange=binance&symbol=${symbol}/USDT&interval=4h&period=9`,
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

export default function useGetRSI(symbol: string) {
  return useQuery({
    queryKey: ["getRSI", symbol],
    queryFn: () => getRSI(symbol),
  });
}
