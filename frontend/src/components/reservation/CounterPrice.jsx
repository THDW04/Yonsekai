export const CounterPrice = ({ value, setValue, total, max = 10 }) => {

  const increase = () => {
    if (value < max && total < max) {
      setValue(value + 1);
    }
  };

  const decrease = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  return (
    <div>
      <button type="button" onClick={decrease}>-</button>
      <span>{value}</span>
      <button type="button" onClick={increase} disabled={value >= max || total >= max}>+</button>
    </div>
  );
};