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
