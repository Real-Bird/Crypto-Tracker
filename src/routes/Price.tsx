import { useQuery } from "@tanstack/react-query";
import { fetchCoinUSD } from "../api";
import styled from "styled-components";

const HeadLine = styled.div`
  height: 5rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: transparent;
  box-shadow: ${(props) => props.theme.priceShadow};
  align-items: center;
  border-radius: 10px;
`;

const SubTitle = styled.h3`
  font-size: 1.4rem;
  color: ${(props) => props.theme.accentColor};
`;

const PrevPrice = styled.div`
  font-size: 1rem;
`;

const PriceRatio = styled.span<{ ratio: number }>`
  font-size: 0.9rem;
  color: ${(props) => (props.ratio > 0 ? "red" : "blue")};
`;

const PriceCardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
`;

const PriceCard = styled(HeadLine)``;

interface ChartProps {
  coinId: string;
}

interface IQuotes {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IQuotes>(
    ["quotes", coinId],
    () => fetchCoinUSD(`${coinId}`),
    {
      refetchInterval: 10000,
    }
  );
  function addNumComa(num: number) {
    const numComaReg = /\B(?=(\d{3})+(?!\d))/g;
    return num?.toFixed(2).replace(numComaReg, ",");
  }
  const athDate = new Date(`${data?.ath_date}`).toDateString();
  return (
    <>
      <HeadLine>
        <SubTitle>All Time High Price</SubTitle>
        <div>{athDate}</div>
        <PrevPrice>${addNumComa(data?.ath_price!)}</PrevPrice>
      </HeadLine>
      <PriceCardBox>
        <PriceCard>
          <SubTitle>Market Cap</SubTitle>
          <PrevPrice>${addNumComa(data?.market_cap!)}</PrevPrice>
          <div>
            24h ago :
            <PriceRatio ratio={data?.market_cap_change_24h!}>
              {data?.market_cap_change_24h}%
            </PriceRatio>
          </div>
        </PriceCard>
        <PriceCard>
          <SubTitle>Volume While 24H</SubTitle>
          <div>{addNumComa(data?.volume_24h!)}</div>
          <div>
            24h ago :
            <PriceRatio ratio={data?.volume_24h_change_24h!}>
              {data?.volume_24h_change_24h}%
            </PriceRatio>
          </div>
        </PriceCard>
        <PriceCard>
          <SubTitle>1H Ago Price</SubTitle>
          <PrevPrice>
            ${addNumComa(data?.price! * data?.percent_change_1h!)}
          </PrevPrice>
          <div>
            Rate:
            <PriceRatio ratio={data?.percent_change_1h!}>
              {data?.percent_change_1h}%
            </PriceRatio>
          </div>
        </PriceCard>
        <PriceCard>
          <SubTitle>12H Ago Price</SubTitle>
          <PrevPrice>
            ${addNumComa(data?.price! * data?.percent_change_12h!)}
          </PrevPrice>
          <div>
            Rate:
            <PriceRatio ratio={data?.percent_change_12h!}>
              {data?.percent_change_12h}%
            </PriceRatio>
          </div>
        </PriceCard>
        <PriceCard>
          <SubTitle>24H Ago Price</SubTitle>
          <PrevPrice>
            ${addNumComa(data?.price! * data?.percent_change_24h!)}
          </PrevPrice>
          <div>
            Rate:
            <PriceRatio ratio={data?.percent_change_24h!}>
              {data?.percent_change_24h}%
            </PriceRatio>
          </div>
        </PriceCard>
        <PriceCard>
          <SubTitle>7D Ago Price</SubTitle>
          <PrevPrice>
            ${addNumComa(data?.price! * data?.percent_change_7d!)}
          </PrevPrice>
          <div>
            Rate:
            <PriceRatio ratio={data?.percent_change_7d!}>
              {data?.percent_change_7d}%
            </PriceRatio>
          </div>
        </PriceCard>
        <PriceCard>
          <SubTitle>30D Ago Price</SubTitle>
          <PrevPrice>
            ${addNumComa(data?.price! * data?.percent_change_30d!)}
          </PrevPrice>
          <div>
            Rate:
            <PriceRatio ratio={data?.percent_change_30d!}>
              {data?.percent_change_30d}%
            </PriceRatio>
          </div>
        </PriceCard>
        <PriceCard>
          <SubTitle>1Y Ago Price</SubTitle>
          <PrevPrice>
            ${addNumComa(data?.price! * data?.percent_change_1y!)}
          </PrevPrice>
          <div>
            Rate:{" "}
            <PriceRatio ratio={data?.percent_change_1y!}>
              {data?.percent_change_1y}%
            </PriceRatio>
          </div>
        </PriceCard>
      </PriceCardBox>
    </>
  );
}

export default Price;
