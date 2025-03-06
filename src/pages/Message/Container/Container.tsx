import { useMessageStore } from "../../../store";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import ContainerNoChat from "./ContainerNoChat";
import Header from "./Header";

const Container = () => {
 const selectedUser = useMessageStore((state) => state.selectedUser);
 return (
  <div className="w-3/4 max-[1281px]:w-full border-2 border-base-200 flex flex-col justify-between flex-1 rounded-2xl">
   {selectedUser ? (
    <>
     <Header />
     <ChatContainer />
     <ChatInput />
    </>
   ) : (
    <ContainerNoChat />
   )}
  </div>
 );
};

export default Container;
