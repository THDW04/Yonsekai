export const PriceFormAdult = ({ children }) => {
  return (
    <div>
      <label>Tarif Adultes</label>
      {children}
    </div>
  )
}

export const PriceFormStudent = ({ children }) => {
  return (
    <div>
      <label>Tarifs Moins de 25 ans</label>
      {children}
    </div>
  )
}