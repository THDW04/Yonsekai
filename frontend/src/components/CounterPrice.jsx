
export const CounterPrice = ({ date, setDate }) => {

  const increase = () => {
    if (value < 10) {
      setDate(date + 1)
    }
  }

  const decrease = () => {
    if (value > 0) {
      setDate(date - 1)
    }
  }

  return (
    <div>
      <button type="button" onClick={decrease}>-</button>

      <input type="number" value={date} />

      <button type="button" onClick={increase}>+</button>
    </div>
  )
}