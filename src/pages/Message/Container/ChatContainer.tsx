import { useShallow } from "zustand/shallow";
import { useAuthStore, useMessageStore } from "../../../store";
import SkeletonMessages from "./SkeletonMessages";
import { formatMessageTime } from "../../../utils";
import { useEffect, useRef } from "react";

const ChatContainer = () => {
 const authUser = useAuthStore((state) => state.authUser);
 const [
  messages,
  isMessagesLoading,
  selectedUser,
  getMessages,
  subscribeToMessages,
  unsubscribeFromMessages,
 ] = useMessageStore(
  useShallow((state) => [
   state.messages,
   state.isMessagesLoading,
   state.selectedUser,
   state.getMessages,
   state.subscribeToMessages,
   state.unsubscribeFromMessages,
  ])
 );

 const chatContainerRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  getMessages(selectedUser?.id || "");
  subscribeToMessages();

  return () => unsubscribeFromMessages();
 }, [
  getMessages,
  selectedUser?.id,
  subscribeToMessages,
  unsubscribeFromMessages,
 ]);

 useEffect(() => {
  const scrollToBottom = () => {
   if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
   }
  };

  scrollToBottom();
 }, [messages]);

 return (
  <>
   {isMessagesLoading ? (
    <SkeletonMessages />
   ) : (
    <div
     ref={chatContainerRef}
     className="w-full h-full overflow-y-auto overflow-x-hidden p-4 flex-1 scroll-smooth"
    >
     {messages.map((message) => (
      <div
       key={message.id}
       className={`chat ${
        message.senderId === authUser?.id ? "chat-end" : "chat-start"
       }`}
      >
       <div className="chat-image avatar">
        <div className="w-10 rounded-full">
         <img
          alt="Avatar"
          src={
           message.senderId === authUser?.id
            ? authUser?.profilePicUrl?.toString()
            : selectedUser?.profilePicUrl?.toString()
          }
         />
        </div>
       </div>
       <div className="chat-header">
        <time className="text-xs opacity-50">
         {formatMessageTime(message.createdAt)}
        </time>
       </div>
       <div className="chat-bubble">{message.content}</div>
      </div>
     ))}
    </div>
   )}
  </>
 );
};

export default ChatContainer;
