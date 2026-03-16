export const ControlUserRow = ({ name, firstName, mail }) => {

   return (
      <tr>
         <td>{name}</td>
         <td>{firstName}</td>
         <td>{mail}</td>

         <td>
            <button>Modifier</button>
            <button>Supprimer</button>
         </td>
      </tr>
   );
}