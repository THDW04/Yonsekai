export const ControlUserTab = ({ users, onEdit, onDelete }) => {

return (
   <>
      <h2>Gérer les utilisateurs</h2>

      <table>
         <thead>
            <tr>
               <th>Nom</th>
               <th>Prénom</th>
               <th>Mail</th>
               <th></th>
            </tr>
          </thead>

         <tbody>
            {users.map(user => (
               <ControlUserRow
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  firstName={user.firstName}
                  mail={user.mail}
                  onEdit={onEdit}
                  onDelete={onDelete}
               />
            ))}
         </tbody>

      </table>
</>
)
}