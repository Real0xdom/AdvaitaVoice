import CallDispatcher from '@/components/CallDispatcher';
import BulkDialer from '@/components/BulkDialer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-purple-500/30">

      {/* Ambient Background Lights */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10vh] left-[20vw] w-[50vh] h-[50vh] bg-blue-600/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-[-10vh] right-[20vw] w-[60vh] h-[60vh] bg-purple-600/15 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center gap-12 w-full max-w-7xl">
        <header className="text-center space-y-4 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Online
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-white">Advaita</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"> Voice AI</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Next-Gen Voice Agent Orchestration.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-start animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <CallDispatcher />
          <BulkDialer />
        </div>

        <footer className="text-sm text-gray-500 animate-in fade-in duration-1000 delay-500 text-center">
          <p>Powered by <span className="text-white font-semibold">Advaita Voice AI</span></p>
        </footer>
      </div>
    </main>
  );
}
