import Image from "next/image";
import CoinCardsContainer from "@/components/CoinCards/CoinCardsContainer";
import CryptoCurrencyPricingTable from "@/components/CryptoCurrencyPricingTable";
import LoginNavButton from "@/components/LoginNavbutton";
import AuthModal from "@/components/AuthModal/AuthModal";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";

export default function Home() {
  const { AuthModalOpen } = useContext(GlobalContext);
  const [AuthModalOpenState] = AuthModalOpen!;
  return (
    <div className="mx-6 my-10 ml-auto mr-auto max-w-5xl">
      <LoginNavButton />
      <CoinCardsContainer />
      <CryptoCurrencyPricingTable />
      {AuthModalOpenState && <AuthModal />}
    </div>
  );
}
