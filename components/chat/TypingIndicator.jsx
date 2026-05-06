export default function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 p-4 bg-zinc-900/50 w-fit rounded-lg ml-6 mb-4 border border-zinc-800">
      <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
    </div>
  );
}
