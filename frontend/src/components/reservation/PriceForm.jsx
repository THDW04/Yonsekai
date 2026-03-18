export const PriceFormAdult = ({ children }) => {
  return (
    <div>
      <label htmlFor="adult">Tarif Adultes</label>
      {children}
    </div>
  )
}

export const PriceFormStudent = ({ children }) => {
  return (
    <div>
      <label htmlFor="student">Tarifs Moins de 25 ans</label>
      {children}
    </div>
  )
}