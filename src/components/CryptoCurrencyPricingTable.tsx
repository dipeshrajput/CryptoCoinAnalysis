import useGetCryptoPricing from "@/hooks/apis/useGetCryptoPrices";
import CoinTableRow from "@/components/CoinTableRow";
import Searchbar from "@/ui/Searchbar";
import { useContext, useEffect, useState } from "react";
import { BackArrowIcon, ForwardArrowIcon } from "../../public/assets/icons";
import CoinDetailsModal from "./CoinDetails/CoinDetailsModal";
import { GlobalContext } from "@/context/globalContext";
import { useForm } from "react-hook-form";

export default function CryptoCurrencyPricingTable() {
  const [page, setPage] = useState(1);

  const [disablePagination, setDisablePagination] = useState(false);

  const { register: coinSearchFormRegister, watch: coinSearchFormWatch } =
    useForm();

  const { data: cryptoPricingData, status: cryptoPricingStatus } =
    useGetCryptoPricing();
  const { coinModalState } = useContext(GlobalContext);
  const [coinModalVisible, setCoinModalVisible] = coinModalState!;

  const [coinsData, setCoinsData] = useState([]);

  const closeCoinDetailModal = () => {
    setCoinModalVisible(false);
  };

  const openCoinDetailModal = () => {
    setCoinModalVisible(true);
  };

  useEffect(() => {
    if (cryptoPricingStatus === "success") {
      console.log("crypto pricing data ->", cryptoPricingData);
      setCoinsData(
        cryptoPricingData?.data?.coins.slice((page - 1) * 10, page * 10)
      );
    }
  }, [cryptoPricingData, cryptoPricingStatus, page]);

  const goToNextPage = () => {
    if (page < 10) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page - 1 >= 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    console.log("watching the state !>", coinSearchFormWatch("coinsearch"));
    let searchKeyword = coinSearchFormWatch("coinsearch");
    if (searchKeyword.length) {
      setDisablePagination(true);
      let coinSearchResults = cryptoPricingData?.data?.coins?.filter(
        (item: any) => item?.id?.includes(searchKeyword)
      );
      setCoinsData(coinSearchResults);
    } else {
      setDisablePagination(false);
      setCoinsData(
        cryptoPricingData?.data?.coins.slice((page - 1) * 10, page * 10)
      );
    }
  }, [coinSearchFormWatch("coinsearch")]);

  return (
    <div className="mt-10 p-5  rounded-xl flex flex-col gap-6 shadow-2xl shadow-neutral-200 border border-l-0 border-r-0 border-b-0 border-t-neutral-100/50">
      <div className="flex flex-row items-center justify-between">
        <p className="text-lg text-neutral-900 font-semibold">
          CRYPTOCURRENCY PRICES
        </p>
        <Searchbar register={coinSearchFormRegister} />
      </div>
      <div className="">
        <table className="table-fixed w-full ">
          <thead className="font-normal ">
            <tr className="text-neutral-600 border border-dashed border-neutral-300">
              <th className="py-4 font-light text-sm w-16">#</th>
              <th className="py-4 font-light text-sm w-24">Coin Name</th>
              <th className="py-4 font-light text-sm w-20 ">Price</th>
              <th className="py-4 font-light text-sm w-20"> 24h% </th>
              <th className="py-4 font-light text-sm w-20"> Total Volume </th>
              <th className="py-4 font-light text-sm w-20">Market Cap</th>
            </tr>
          </thead>
          <tbody className="table-auto w-full">
            {coinsData &&
              coinsData.map((coin: any, index) => (
                <CoinTableRow
                  id={coin?.id}
                  key={coin?.id}
                  rank={coin?.market_cap_rank}
                  coinName={coin?.name}
                  coinImageUrl={coin?.image}
                  price={coin?.current_price}
                  hour24Change={coin?.price_change_percentage_24h}
                  totalVolume={coin?.total_volume}
                  marketCap={coin?.market_cap}
                />
              ))}
          </tbody>
        </table>
      </div>
      {!disablePagination && (
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-row items-center gap-4">
            <BackArrowIcon
              onClick={goToPreviousPage}
              className="h-5 w-5 text-neutral-700 active:scale-90"
            />
            <p className="text-base">
              Page <span className="font-semibold"> {page} of 10</span>{" "}
            </p>
            <ForwardArrowIcon
              onClick={goToNextPage}
              className="h-5 w-5 text-neutral-700 active:scale-90"
            />
          </div>
        </div>
      )}
      {coinModalVisible && (
        <CoinDetailsModal closeModal={closeCoinDetailModal} />
      )}
    </div>
  );
}
