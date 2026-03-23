import styles from './CounterPrice.module.css'

export const CounterPrice = ({ name, value, setValue, total, max = 10 }) => {

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
    <div className={styles.counterPrice}>
      <button type="button" onClick={decrease}>-</button>
      <input type='number' name={name} id={name} max={max} value={value} readOnly />
      <button type="button" onClick={increase} disabled={value >= max || total >= max}>+</button>
    </div>
  );
};