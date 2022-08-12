import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.coinBgColor};
  color: #1b1464;
  border-radius: 10px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 32px;
`;

const Loader = styled.span`
  text-align: center;
  color: white;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data: coins } = useQuery<ICoin[]>(
    ["allCoins"],
    fetchCoins
  );
  return (
    <Container>
      <Helmet>
        <title>Crypto Tracker</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, rank: coin.rank }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  width={40}
                  height={40}
                />
                <span>{coin.name} &rarr;</span>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
