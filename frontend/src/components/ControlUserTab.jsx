import {ControlUserRow} from './ControlUserRow';

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <ControlUserRow 
              key={user.id} 
              user={user}
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </>
  );
};