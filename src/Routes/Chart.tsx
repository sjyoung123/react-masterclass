import { useQuery } from "react-query";
import { CoinChartFetcher } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ICoinId {
  coinId: string;
}

function Chart({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<IHistory[]>(
    ["ohlcv", coinId],
    () => CoinChartFetcher(coinId),
    { refetchInterval: 10000 }
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          // <ApexChart
          //   type="line"
          //   series={[
          //     {
          //       name: coinId,
          //       data: data?.map((price) => price.close),
          //     },
          //   ]}
          //   options={{
          //     theme: {
          //       mode: "dark",
          //     },
          //     chart: {
          //       height: 300,
          //       width: 500,
          //       toolbar: {
          //         show: false,
          //       },
          //       background: "transparent",
          //     },
          //     grid: { show: false },
          //     stroke: {
          //       curve: "smooth",
          //       width: 4,
          //     },
          //     yaxis: {
          //       show: false,
          //     },
          //     xaxis: {
          //       axisBorder: { show: false },
          //       axisTicks: { show: false },
          //       labels: { show: false },
          //       type: "datetime",
          //       categories: data?.map((price) => price.time_close),
          //     },
          //     fill: {
          //       type: "gradient",
          //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          //     },
          //     colors: ["#0fbcf9"],
          //     tooltip: {
          //       y: {
          //         formatter: (value) => `$${value.toFixed(2)}`,
          //       },
          //     },
          //   }}
          // />
          <ApexChart
            type="candlestick"
            series={[
              {
                name: coinId,
                data: data?.map((price) => {
                  return {
                    x: new Date(price.time_close),
                    y: [
                      price.open.toFixed(2),
                      price.high.toFixed(2),
                      price.low.toFixed(2),
                      price.close.toFixed(2),
                    ],
                  };
                }),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#3C90EB",
                    downward: "#DF7D46",
                  },
                },
              },
              chart: {
                width: 700,
                height: "500px",
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                show: false,
              },
            }}
          />
        )}
      </div>
    </>
  );
}

export default Chart;
