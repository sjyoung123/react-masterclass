import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  img {
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  div {
    margin: 5px 0;
  }
`;

const OverViewItem = styled.div`
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  margin-bottom: 30px;
`;

const Taps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

interface ITap {
  isActive: boolean;
}

const Tap = styled.div<ITap>`
  background-color: rgba(0, 0, 0, 0.5);
  width: 45%;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  a {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  const chartMatch = useMatch("/:id/chart");
  const priceMatch = useMatch("/:id/price");

  useEffect(() => {
    (async () => {
      const coinData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const coinPriceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(coinData);
      setPriceInfo(coinPriceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
          <img
            src={`https://cryptoicon-api.vercel.app/api/icon/${info?.symbol.toLowerCase()}`}
            alt="coin symbol"
          />
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>Rank: {info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol: {info?.symbol}</span>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>

          <OverView>
            <OverViewItem>
              <div>Total Supply: {priceInfo?.total_supply}</div>
              <div>Max Supply: {priceInfo?.max_supply}</div>
            </OverViewItem>
          </OverView>

          <Taps>
            <Tap isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tap>
            <Tap isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tap>
          </Taps>

          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
