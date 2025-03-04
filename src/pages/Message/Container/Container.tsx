import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import Header from "./Header";

const Container = () => {
 return (
  <div className="w-3/4 border-2 border-base-200 flex flex-col justify-between rounded-2xl">
   <Header />
   <ChatContainer />
   <ChatInput />
  </div>
 );
};

export default Container;
