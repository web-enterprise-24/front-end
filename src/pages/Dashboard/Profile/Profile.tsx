import Address from "./Address";
import Header from "./Header";
import PersonalInfo from "./PersonalInfo";

import { useAuthStore } from "../../../store";

const Profile = () => {
 const authUser = useAuthStore((state) => state.authUser);
 return (
  <div className="w-full h-full p-8 bg-base-100">
   <div className="flex flex-col gap-8">
    <h1 className="text-xl font-bold">My Profile</h1>
    <Header data={authUser} />
    <PersonalInfo data={authUser} />
    <Address data={authUser} />
   </div>
  </div>
 );
};

export default Profile;
