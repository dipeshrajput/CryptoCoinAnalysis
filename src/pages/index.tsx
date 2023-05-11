import Image from "next/image";
import { Inter, Fira_Code } from "next/font/google";
import CoinCardsContainer from "@/components/CoinCards/CoinCardsContainer";
import CryptoCurrencyPricingTable from "@/components/CryptoCurrencyPricingTable";

export default function Home() {
  return (
    <div className="mx-6 my-10 ml-auto mr-auto max-w-5xl">
      <CoinCardsContainer />
      <CryptoCurrencyPricingTable />
    </div>
  );
}
