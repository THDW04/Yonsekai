import { useState, useEffect } from "react";
import { ControlUserRow } from "./ControlUserRow";

export const ControlUserTab = () => {

   const [users, setUsers] = useState([]);

   useEffect(() => {
      fetch("http://localhost/yonsekai/backend/api/apiController.php?action=allUsers")
         .then(response => response.json())
         .then(data => {
            setUsers(data);
         })
         .catch(error => {
            console.error("Erreur:", error);
         });
   }, []);

   return (
      <>
         <h2>Gérer les utilisateurs</h2>

         <table>
            <thead>
               <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Mail</th>
                  <th scope="col"></th>
               </tr>
            </thead>

            <tbody>
               {users.map(user => (
                  <ControlUserRow
                     key={user.id}
                     name={user.name}
                     firstName={user.firstName}
                     mail={user.mail}
                  />
               ))}
            </tbody>

         </table>
      </>
   );
}