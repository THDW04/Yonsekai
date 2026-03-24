export const ControlUserRow = ({ id, name, firstName, mail, onEdit, onDelete }) => {

   return (
      <tr>
         <td>{name}</td>
         <td>{firstName}</td>
         <td>{mail}</td>

         <td>
            <button onClick={() => onEdit({ id, name, firstName, mail })}>
               Modifier
            </button>

            <button onClick={() => onDelete(id)}>
               Supprimer
            </button>
         </td>
      </tr>
   );
}