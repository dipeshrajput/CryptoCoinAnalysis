import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCoinHistory = async (uuid: string, timePeriod: string) => {
  try {
    const response = await axios(
      `https://api.coinranking.com/v2/coin/${uuid}/history?timePeriod=${timePeriod}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": process.env.COINRANKING_API_KEY,
        },
      }
    );
    return response;
  } catch (err: any) {
    return { err, ...err.response };
  }
};

export default function useGetCoinHistory(uuid: string, timePeriod: string) {
  return useQuery({
    queryKey: ["getCoinHistory", uuid, timePeriod],
    queryFn: () => getCoinHistory(uuid, timePeriod),
  });
}
