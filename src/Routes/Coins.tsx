import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinsFetcher } from "../api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
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

const CoinListContainer = styled.div`
  height: 80vh;
  overflow-y: scroll;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ghostwhite;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in-out;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  height: 35px;
  width: 35px;
  margin-right: 15px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", CoinsFetcher);

  // const [coins, setCoins] = useState<ICoins[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //   })();
  //   setLoading(false);
  // }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinListContainer>
          <CoinList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        </CoinListContainer>
      )}
    </Container>
  );
}
export default Coins;
