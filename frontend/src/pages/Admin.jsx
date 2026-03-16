import { useState } from "react";
import { ControlUserTab } from "../components/ControlUserTab";
import { ModifyUserTab } from "../components/ModifyUserTab";

export const Admin = () => {

const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);

const handleEdit = (user) => {
   setSelectedUser(user);
};

const handleDelete = (id) => {

fetch(`http://localhost/yonsekai/backend/api/apiController.php?action=deleteUser&id=${id}`,{
method:"DELETE"
})
.then(() => {
setUsers(users.filter(user => user.id !== id));
});

};

return (
<section>

<ControlUserTab
   users={users}
   onEdit={handleEdit}
   onDelete={handleDelete}
/>

{selectedUser && (
<ModifyUserTab user={selectedUser}/>
)}

</section>
);
}