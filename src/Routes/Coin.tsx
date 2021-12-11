import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinInfoFetcher, CoinPriceFetcher } from "../api";
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
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
  svg {
    width: 40px;
    height: 40px;
    &:hover {
      cursor: pointer;
    }
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

interface IParams {
  coinId: string;
}

interface ILocation {
  state: {
    name: string;
  };
}

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
interface IIsDark {
  isDark: boolean;
}

function Coin({ isDark }: IIsDark) {
  const { coinId } = useParams() as IParams;
  const { state } = useLocation() as ILocation;

  let navigate = useNavigate();

  const chartMatch = useMatch("/:id/chart");
  const priceMatch = useMatch("/:id/price");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => CoinInfoFetcher(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => CoinPriceFetcher(coinId),
    { refetchInterval: 10000 }
  );

  const loading = infoLoading || priceLoading;

  const onClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faHome} onClick={onClick} />
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          <img
            src={`https://cryptoicon-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
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
              <span>Rank: {infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol: {infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Price: ${priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>

          <OverView>
            <OverViewItem>
              <div>Total Supply: {priceData?.total_supply}</div>
              <div>Max Supply: {priceData?.max_supply}</div>
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
            <Route path="price" element={<Price coinId={coinId} />} />
            <Route path="chart" element={<Chart coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
