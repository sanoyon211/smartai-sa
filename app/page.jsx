export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-950 text-white">
      <h1 className="text-6xl font-bold mb-4 tracking-tighter">SmartChat AI</h1>
      <p className="text-zinc-400 text-xl mb-8">Next generation conversational intelligence.</p>
      <div className="flex gap-4">
        <a href="/login" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors">
          Get Started
        </a>
      </div>
    </main>
  );
}
