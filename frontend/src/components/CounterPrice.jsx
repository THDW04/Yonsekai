
export const CounterPrice = ({ value, setValue }) => {

  const increase = () => {
    if (value < 10) {
      setValue(value + 1)
    }
  }

  const decrease = () => {
    if (value > 0) {
      setValue(value - 1)
    }
  }

  return (
    <div>
      <button type="button" onClick={decrease}>-</button>

      <input type="number" value={value} />

      <button type="button" onClick={increase}>+</button>
    </div>
  )
}