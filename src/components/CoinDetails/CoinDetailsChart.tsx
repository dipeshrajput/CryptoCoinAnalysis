import useGetCoinHistory from "@/hooks/apis/useGetCoinHistory";
import tw from "@/utils/tw";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import VictoryCandleStickChart from "./VictoryCandleStickChart";

type ChartTimePeriod = "week" | "month" | "year";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const sampleOHLC = [
  [1682366400000, 27388.26, 27388.26, 27349.39, 27349.39],
  [1682380800000, 27363.09, 27457.54, 27363.09, 27457.54],
  [1682395200000, 27511.64, 27511.64, 27383.66, 27383.66],
  [1682409600000, 27372.39, 27442.38, 27372.39, 27401.62],
  [1682424000000, 27286.46, 27342.9, 27286.46, 27342.9],
  [1682438400000, 27381.15, 27381.15, 27275.59, 27275.59],
  [1682452800000, 27346.49, 27646.02, 27346.49, 27646.02],
  [1682467200000, 27646.37, 28263.52, 27646.37, 28258.04],
  [1682481600000, 28351.22, 28369.3, 28345.51, 28367.33],
  [1682496000000, 28338.41, 28384.29, 28338.41, 28380.97],
  [1682510400000, 28349.74, 29010.92, 28349.74, 29010.92],
  [1682524800000, 28969.85, 29848.9, 28969.85, 29672.99],
  [1682539200000, 29813.78, 29813.78, 29742.4, 29742.4],
  [1682553600000, 28071.53, 28422.48, 28071.53, 28422.48],
  [1682568000000, 28352.19, 29269.3, 28352.19, 29055.64],
  [1682582400000, 28988.84, 29193.68, 28823.85, 28823.85],
  [1682596800000, 28916.57, 28992.46, 28916.57, 28992.46],
  [1682611200000, 28922.02, 29034.97, 28838.74, 29034.97],
  [1682625600000, 29118.99, 29869.46, 29076.84, 29869.46],
  [1682640000000, 29696.49, 29696.49, 29488.31, 29488.31],
  [1682654400000, 29487.59, 29487.59, 29450.85, 29450.85],
  [1682668800000, 29419.19, 29508.38, 29419.19, 29450.81],
  [1682683200000, 29506.69, 29506.69, 29232.65, 29305.82],
  [1682697600000, 29289.45, 29289.45, 28969.26, 29207.56],
  [1682712000000, 29171.6, 29290.87, 29171.6, 29208.51],
  [1682726400000, 29345.13, 29396.3, 29345.13, 29396.3],
  [1682740800000, 29339.99, 29404.06, 29260.12, 29404.06],
  [1682755200000, 29390.2, 29393.76, 29345.95, 29345.95],
  [1682769600000, 29383.37, 29383.37, 29301.62, 29301.62],
  [1682784000000, 29334.75, 29423.37, 29323.53, 29369.65],
  [1682798400000, 29334.58, 29334.58, 29156.37, 29199.19],
  [1682812800000, 29275.82, 29275.82, 29217.8, 29240.18],
  [1682827200000, 29217.94, 29217.94, 29164.7, 29188.89],
  [1682841600000, 29196.63, 29297.56, 29196.63, 29297.56],
  [1682856000000, 29304.94, 29304.94, 29235.09, 29235.09],
  [1682870400000, 29220.38, 29440.28, 29220.38, 29440.28],
  [1682884800000, 29809.78, 29809.78, 29656.71, 29656.71],
  [1682899200000, 29358.66, 29441.59, 29348.74, 29400.03],
  [1682913600000, 29362.06, 29362.06, 28595.98, 28595.98],
  [1682928000000, 28580.88, 28598.8, 28431.24, 28598.8],
  [1682942400000, 28642.33, 28642.33, 28560.37, 28560.37],
  [1682956800000, 28561.59, 28620.46, 28472.79, 28472.79],
  [1682971200000, 28167.75, 28385.38, 28167.75, 28385.38],
];
const series = [
  {
    data: sampleOHLC,
  },
];

const CoinDetailsChart = () => {
  const [chartHistory, setChartHistory] = useState<ChartTimePeriod>("month");

  const { data } = useGetCoinHistory("Qwsogvtv82FCd", "7d");
  const changeChartHistory = (hist: ChartTimePeriod) => () => {
    setChartHistory(hist);
  };
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    console.log("coin history ->", data);
  }, [data]);
  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  return (
    <div className="">
      <div className="flex flex-row items-center gap-5">
        <button
          className={tw(
            chartHistory === "week" &&
              "py-1 px-3 bg-neutral-700 shadow-lg shadow-neutral-400 rounded-lg active:scale-95"
          )}
          onClick={changeChartHistory("week")}
        >
          <p
            className={tw(
              "text-sm",
              chartHistory === "week" ? "text-white " : "text-black "
            )}
          >
            WEEK
          </p>
        </button>
        <button
          className={tw(
            chartHistory === "month" &&
              "py-1 px-3 bg-neutral-700 shadow-lg shadow-neutral-400 rounded-lg active:scale-95"
          )}
          onClick={changeChartHistory("month")}
        >
          <p
            className={tw(
              "text-sm",
              chartHistory === "month" ? "text-white " : "text-black "
            )}
          >
            MONTH
          </p>
        </button>
        <button
          className={tw(
            chartHistory === "year" &&
              "py-1 px-3 bg-neutral-700 shadow-lg shadow-neutral-400 rounded-lg active:scale-95"
          )}
          onClick={changeChartHistory("year")}
        >
          <p
            className={tw(
              "text-sm",
              chartHistory === "year" ? "text-white " : "text-black "
            )}
          >
            YEAR
          </p>
        </button>
      </div>

      <div className="">
        <VictoryCandleStickChart />
      </div>
    </div>
  );
};

export default CoinDetailsChart;
