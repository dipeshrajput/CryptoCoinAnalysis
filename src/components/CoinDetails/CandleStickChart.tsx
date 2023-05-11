import { ChartCanvas, Chart } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { CandlestickSeries } from "react-stockcharts/lib/series";

interface Props {
  type: any;
}

const CandleStickChart = ({ type }: Props) => {
  return (
    <ChartCanvas
      height={400}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      xAccessor={(d) => d.date}
      displayXAccessor={}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d) => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries />
      </Chart>
    </ChartCanvas>
  );
};

export default CandleStickChart;
