import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCoinDetail = async (id: string) => {
  try {
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/${id}`,
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

export default function useGetCoinOHLC(id: string) {
  return useQuery({
    queryKey: ["getCoinDetail", id],
    queryFn: () => getCoinDetail(id),
    enabled: !!id,
  });
}
