export const ControlUserRow = ({ user, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{user.nom}</td>
      <td>{user.prenom}</td>
      <td>{user.mail}</td>

      <td>
        <button onClick={() => onEdit(user)}>Modifier</button>

        <button onClick={() => onDelete(user.id)}>Supprimer</button>
      </td>
    </tr>
  );
};