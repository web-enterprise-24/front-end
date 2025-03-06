import { MessageCircleMore } from "lucide-react";

const ContainerNoChat = () => {
 return (
  <div className="w-full h-full flex items-center justify-center p-6">
   <div className="flex flex-col items-center gap-4">
    <MessageCircleMore className="size-10 animate-bounce" />
    <p className="font-bold text-lg text-primary-content">
     Welcome to E-tutoring chat
    </p>
    <p className="font-bold text-sm text-base-300">
     Select a conversation to start chatting
    </p>
   </div>
  </div>
 );
};

export default ContainerNoChat;
