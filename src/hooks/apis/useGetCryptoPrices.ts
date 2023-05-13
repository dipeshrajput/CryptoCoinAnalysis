import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCryptoPricing = async (page?: string) => {
  try {
    const res = await axios(`api/coins_list`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err: any) {
    return { err, ...err.response };
  }
};

const useGetCryptoPricing = (page?: number) => {
  return useQuery({
    queryKey: ["getCrypto", page],
    queryFn: () => getCryptoPricing(page?.toString()),
    retry: 3,
  });
};

export default useGetCryptoPricing;
