import { useEffect, useState } from "react";

import Converter from "./Converter";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const getCoins = async () => {
    const response = await fetch("https://api.coinpaprika.com/v1/tickers");
    const json = await response.json();

    setCoins(json);
    setIsLoading((current) => !current);
  };

  useEffect(() => {
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
