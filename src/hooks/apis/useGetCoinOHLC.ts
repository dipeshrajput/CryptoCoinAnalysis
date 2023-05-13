import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCoinOHLC = async (id: string, days: number) => {
  try {
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err: any) {
    return { err, ...err.response };
  }
};

export default function useGetCoinOHLC(id: string, days: number) {
  return useQuery({
    queryKey: ["getCoinDetail", id, days],
    queryFn: () => getCoinOHLC(id, days),
    enabled: !!id,
  });
}
