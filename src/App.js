import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/tickers");
      const json = await response.json();

      setCoins(json);
      setIsLoading((current) => !current);
    };

    getCoins();
  }, []);

  return (
    <div>
      <h1>Coin Tracker {isLoading ? "" : `(${coins.length})`}</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} (USD)
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
