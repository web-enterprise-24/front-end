import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Send, Smile } from "lucide-react";
import { useRef, useState } from "react";

const ChatInput = () => {
 const [showEmoji, setShowEmoji] = useState(false);
 const [message, setMessage] = useState("");

 const textareaRef = useRef<HTMLTextAreaElement | null>(null);
 const formRef = useRef<HTMLFormElement | null>(null);
 const submitBtnRef = useRef<HTMLButtonElement | null>(null);

 const handleResize = () => {
  const textarea = textareaRef.current;
  if (textarea) {
   textarea.style.height = "auto";
   textarea.style.height = `${textarea.scrollHeight}px`;
  }
 };

 const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setMessage(e.target.value);
  handleResize();
 };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Submitting...");
 };

 const onEmojiClick = (emojiData: EmojiClickData) => {
  if (textareaRef.current) {
   const start = textareaRef.current.selectionStart;
   const end = textareaRef.current.selectionEnd;
   const newMessage =
    message.substring(0, start) + emojiData.emoji + message.substring(end);

   setMessage(newMessage);
   // Set cursor position after emoji
   setTimeout(() => {
    if (textareaRef.current) {
     const newCursorPos = start + emojiData.emoji.length;
     textareaRef.current.selectionStart = newCursorPos;
     textareaRef.current.selectionEnd = newCursorPos;
    }
   }, 0);
  }
 };

 return (
  <div className="w-full min-h-24 h-24 border-t-2 border-base-200 p-2 relative">
   <form
    ref={formRef}
    className="w-full h-full flex flex-row items-center justify-center gap-2 "
    onSubmit={(e) => handleSubmit(e)}
   >
    <textarea
     ref={textareaRef}
     placeholder="Type here"
     rows={1}
     value={message}
     onChange={(e) => handleChange(e)}
     onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
       e.preventDefault();
       if (submitBtnRef.current) {
        submitBtnRef.current.click();
       }
      }
     }}
     className="textarea textarea-bordered text-lg leading-tight w-full resize-none min-h-10 max-h-20 scrollbar-hide"
    />
    <span
     className="cursor-pointer size-10 hover:bg-base-300 flex items-center justify-center rounded-lg transition-colors ease-linear duration-100"
     onClick={() => setShowEmoji(!showEmoji)}
    >
     <Smile />
    </span>
    <button ref={submitBtnRef} className="btn btn-ghost">
     <Send />
    </button>
   </form>
   {showEmoji && (
    <div className="absolute bottom-full right-0 mb-2">
     <EmojiPicker open onEmojiClick={onEmojiClick} />
    </div>
   )}
  </div>
 );
};

export default ChatInput;
