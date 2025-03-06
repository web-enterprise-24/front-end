function formatMessageTime(date: string) {
 return new Date(date).toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour12: false,
 });
}

export default formatMessageTime;
