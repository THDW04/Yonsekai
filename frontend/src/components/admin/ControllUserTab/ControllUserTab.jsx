import {ControlUserRow} from '../ControlUserRow';
import styles from './ControllUserTab.module.css'

export const ControlUserTab = ({ users, onEdit, onDelete }) => {
  return (
    <>
      <div className={styles.tableContainer}>
        <h2>Gérer les utilisateurs</h2>
        <table className={styles.dataTable}>
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
                key={user.id_user}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};