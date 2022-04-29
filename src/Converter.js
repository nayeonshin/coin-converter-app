import { memo, useState } from "react";

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

  const CoinOptions = () => {
    return (
      <select onChange={onSelect}>
        {coins.map((coin, index) => (
          <option key={coin.id} value={index}>
            {coin.name} ({symbol}): ${price} (USD)
          </option>
        ))}
      </select>
    );
  };

  const MemoizedCoinOptions = memo(CoinOptions);

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
      <MemoizedCoinOptions />
    </>
  );
};

export default Converter;
