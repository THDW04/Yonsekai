import { CounterPrice } from "../CounterPrice/CounterPrice";
import styles from "./PriceForm.module.css"

export const PriceForm = ({ label, description, value, setValue, total }) => {
  return (
    <div className={styles.priceForm}>
      <label htmlFor={label} >{label}</label>
      <p>{description}</p>
      <CounterPrice name={label} id={label} value={value} setValue={setValue} total={total}/>
    </div>
  );
};