import Container from "./Container/Container";
import Sidebar from "./Sidebar/Sidebar";

const Message = () => {
 return (
  <div className="w-5/6 h-full flex flex-row gap-2 mx-auto py-6">
   <Sidebar />
   <Container />
  </div>
 );
};

export default Message;
