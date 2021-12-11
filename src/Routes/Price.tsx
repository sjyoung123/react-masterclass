import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PriceContainer = styled.div`
  padding: 15px 0;
`;

const Tag = styled.span``;

const Text = styled.span<{ isPositive?: Boolean }>`
  color: ${(props) => (props.isPositive ? props.theme.accentColor : "tomato")};
`;

interface ICoinId {
  isLoading: boolean;
  data?: IPriceDetail;
}
interface IPriceDetail {
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

function Price({ isLoading, data }: ICoinId) {
  // const { isLoading, data } = useQuery<IPriceDetail>(
  //   ["priceDetail", coinId],
  //   () => CoinPriceFetcher(coinId),
  //   { refetchInterval: 10000 }
  // );

  function checkPositive(value: number | undefined) {
    if (value) {
      return value > 0;
    }
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Container>
            <PriceContainer>
              <Tag>Price: </Tag>
              <Text isPositive={true}>
                ${data?.quotes.USD.price.toFixed(2)}
              </Text>
            </PriceContainer>
            <PriceContainer>
              <Tag>Change rate(1h): </Tag>
              <Text
                isPositive={
                  checkPositive(data?.quotes.USD.percent_change_1h) === true
                }
              >
                {data?.quotes.USD.percent_change_1h}%
              </Text>
            </PriceContainer>
            <PriceContainer>
              <Tag>Change rate(12h): </Tag>
              <Text
                isPositive={
                  checkPositive(data?.quotes.USD.percent_change_12h) === true
                }
              >
                {data?.quotes.USD.percent_change_12h}%
              </Text>
            </PriceContainer>
            <PriceContainer>
              <Tag>Change rate(24h): </Tag>
              <Text
                isPositive={
                  checkPositive(data?.quotes.USD.percent_change_24h) === true
                }
              >
                {data?.quotes.USD.percent_change_24h}%
              </Text>
            </PriceContainer>
            <PriceContainer>
              <Tag>Change rate(30d): </Tag>
              <Text
                isPositive={
                  checkPositive(data?.quotes.USD.percent_change_30d) === true
                }
              >
                {data?.quotes.USD.percent_change_30d}%
              </Text>
            </PriceContainer>
          </Container>
        </>
      )}
    </>
  );
}

export default Price;
