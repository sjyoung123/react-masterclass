const BASE_URL = "https://api.coinpaprika.com/v1";

export async function CoinsFetcher() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function CoinInfoFetcher(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function CoinPriceFetcher(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function CoinChartFetcher(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 14;
  return await (
    await fetch(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    )
  ).json();
}
