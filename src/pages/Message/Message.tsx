import { useShallow } from "zustand/shallow";
import { useMessageStore } from "../../store";
import Container from "./Container/Container";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect, useRef } from "react";

const Message = () => {
  const [selectedUser, getUsers] = useMessageStore(
    useShallow((state) => [state.selectedUser, state.getUsers])
  );

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (chatContainerRef.current) {
      window.scrollTo({ top: chatContainerRef.current.offsetTop, behavior: "smooth" });
    }
  }, []);

  return (
    <>    
    <div className="card-body h-full bg-base-100">
      <div className="xl:hidden w-3/4 max-md:w-full max-md:px-2 h-full flex flex-row gap-2 mx-auto py-6">
        {selectedUser ? <Container /> : <Sidebar />}
      </div>
      <div ref={chatContainerRef} className="w-5/6 h-full hidden xl:flex flex-row gap-2 mx-auto py-6">
        <Sidebar />
        <Container />
      </div>
      </div>
    </>
  );
};

export default Message;
