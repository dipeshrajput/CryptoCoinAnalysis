import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import useGetCryptoPricing from "@/hooks/apis/useGetCryptoPrices";
import tw from "@/utils/tw";

export default function CoinCardsContainer() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [coinState, setCoinState] = useState([]);
  const { data: coinsData, status: coinsDataStatus } = useGetCryptoPricing();
  const [paginationIndex, setPaginationIndex] = useState(0);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (coinsDataStatus === "success") {
      setCoinState(coinsData?.data?.coins?.slice(0, 6));
    }
  }, [coinsData, coinsDataStatus]);

  console.log("coinState ->", coinState);
  return (
    <div className="">
      {domLoaded && coinState && (
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          className="h-52"
          onSlideChange={(e) => {
            console.log("slide changed !>", e);
            setPaginationIndex(e.snapIndex);
          }}
          slidesPerGroup={2}
        >
          {coinState?.map((coin: any, index) => (
            <SwiperSlide key={coin?.id}>
              <CoinCard
                coinName={coin?.name}
                coinImage={coin?.image}
                coinPrice={coin?.current_price}
                priceChange24hr={coin?.price_change_percentage_24h}
                allTimeHigh={coin?.ath}
                sparkLine7d={coin?.sparkline_in_7d?.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="mt-4 w-full flex flex-row items-center gap-3 justify-center ">
        {Array(3)
          .fill(0)
          .map((val, index) => (
            <div
              key={index}
              className={tw(
                "w-2.5 h-2.5 bg-neutral-200 rounded-full",
                paginationIndex === index && "w-4 rounded-md bg-neutral-400"
              )}
            />
          ))}
      </div>
    </div>
  );
}
