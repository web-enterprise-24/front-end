import { useShallow } from "zustand/shallow";
import { useMessageStore } from "../../store";
import Container from "./Container/Container";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect } from "react";

const Message = () => {
 const [selectedUser, getUsers] = useMessageStore(
  useShallow((state) => [state.selectedUser, state.getUsers])
 );

 useEffect(() => {
  getUsers();
 }, [getUsers]);

 return (
  <>
   <div className="xl:hidden w-3/4 max-md:w-full max-md:px-2 h-full flex flex-row gap-2 mx-auto py-6">
    {selectedUser ? <Container /> : <Sidebar />}
   </div>
   <div className="w-5/6 h-full hidden xl:flex flex-row gap-2 mx-auto py-6">
    <Sidebar />
    <Container />
   </div>
  </>
 );
};

export default Message;
