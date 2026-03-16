import { ControlUserTab } from "../components/ControlUserTab";
import { ModifyUserTab } from "../components/ModifyUserTab";

export const Admin = () => {

   return (
      <section>
         <ControlUserTab />
         <ModifyUserTab />
      </section>
   );
}