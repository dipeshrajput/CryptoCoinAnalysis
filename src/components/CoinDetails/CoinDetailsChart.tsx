import tw from "@/utils/tw";
import { useEffect, useState } from "react";
import VictoryCandleStickChart from "./VictoryCandleStickChart";
import useGetCoinOHLC from "@/hooks/apis/useGetCoinOHLC";

interface Props {
  id: string;
}

const CoinDetailsChart = ({ id }: Props) => {
  const [ohlcTimePeriod, setOhlcTimePeriod] = useState(7);
  const { data: ohlcData, status: ohlcDataStatus } = useGetCoinOHLC(
    id,
    ohlcTimePeriod
  );
  const [ohlcHistoryData, setOhlcHistoryData] = useState([[]]);

  useEffect(() => {
    if (ohlcDataStatus === "success") {
      //console.log("coin ohlc ->", ohlcData);
      setOhlcHistoryData(ohlcData?.data);
    }
  }, [ohlcData, ohlcDataStatus]);

  return (
    <div className="">
      <div className="flex flex-row items-center gap-5">
        <button
          className={tw(
            ohlcTimePeriod === 7 &&
              "py-1 px-3 bg-neutral-700 shadow-lg shadow-neutral-400 rounded-lg active:scale-95"
          )}
          onClick={() => setOhlcTimePeriod(7)}
        >
          <p
            className={tw(
              "text-sm",
              ohlcTimePeriod === 7 ? "text-white " : "text-black "
            )}
          >
            WEEK
          </p>
        </button>
        <button
          className={tw(
            ohlcTimePeriod === 30 &&
              "py-1 px-3 bg-neutral-700 shadow-lg shadow-neutral-400 rounded-lg active:scale-95"
          )}
          onClick={() => setOhlcTimePeriod(30)}
        >
          <p
            className={tw(
              "text-sm",
              ohlcTimePeriod === 30 ? "text-white " : "text-black "
            )}
          >
            MONTH
          </p>
        </button>
        <button
          className={tw(
            ohlcTimePeriod === 365 &&
              "py-1 px-3 bg-neutral-700 shadow-lg shadow-neutral-400 rounded-lg active:scale-95"
          )}
          onClick={() => setOhlcTimePeriod(365)}
        >
          <p
            className={tw(
              "text-sm",
              ohlcTimePeriod === 365 ? "text-white " : "text-black "
            )}
          >
            YEAR
          </p>
        </button>
      </div>

      <div className="">
        <VictoryCandleStickChart historyData={ohlcHistoryData} />
      </div>
    </div>
  );
};

export default CoinDetailsChart;
