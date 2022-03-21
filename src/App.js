import { useEffect, useState } from "react";

const Converter = ({ coins }) => {
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState(0);

  const onChange = (event) => setAmount(event.target.value);
  const onSelect = (event) => setValue(event.target.value);

  const {
    symbol,
    quotes: {
      USD: { price },
    },
  } = coins[value];

  return (
    <>
      <input
        onChange={onChange}
        placeholder="Enter USD here."
        type="number"
        value={amount}
      />
      <span style={{ marginLeft: "0.5em" }}>USD</span>
      <h3>
        ~{Math.round(amount / price)} {symbol}
      </h3>
      <select onChange={onSelect}>
        {coins.map((coin, index) => (
          <option key={coin.id} value={index}>
            {coin.name} ({symbol}): ${price} (USD)
          </option>
        ))}
      </select>
    </>
  );
};

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
      <h1>USD to Coin {isLoading ? "" : `(${coins.length} coins)`}</h1>
      {isLoading ? <h3>Loading...</h3> : <Converter coins={coins} />}
    </div>
  );
}

export default App;
