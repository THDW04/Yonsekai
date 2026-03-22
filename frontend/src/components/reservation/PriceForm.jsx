import { CounterPrice } from "./CounterPrice";
export const PriceForm = ({ label, value, setValue, total }) => {
  return (
    <div>
      <label>{label}</label>
      <CounterPrice value={value} setValue={setValue} total={total}/>
    </div>
  );
};