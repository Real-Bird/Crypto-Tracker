import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import Apexchart from "react-apexcharts";

interface ChartProps {
  coinId: string;
  isLight: boolean;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId, isLight }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(`${coinId}`),
    {
      // refetchInterval: 5000,
    }
  );
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <Apexchart
            type="candlestick"
            series={[
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      Number(price.open),
                      Number(price.high),
                      Number(price.low),
                      Number(price.close),
                    ],
                  };
                })!,
              },
            ]}
            options={{
              theme: {
                mode: isLight ? "light" : "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#c0392b",
                    downward: "#3498db",
                  },
                },
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              xaxis: {
                categories: data?.map((price) => price.time_close),
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
        </>
      )}
    </>
  );
}

export default Chart;
