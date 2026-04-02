import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const fullText = '// INITIALIZING';
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] p-8 flex flex-col items-center justify-center">
      {/* Terminal-style header */}
      <div className="w-full max-w-2xl mb-12">
        <pre className="text-xs text-[#00ff9d] font-mono mb-2">
{`  ______                      __           
 |  ____|                    /  |          
 | |__ ___  ___ ___  _ __ ___  | |          
 |  __/ __|/ __/ _ \\| '_ \` _ \\ | |          
 | |__\\__ \\ (_| (_) | | | | | ||_|          
 |______/___/\\___|_| |_| |_|_/(_)          
                                          `}
        </pre>
        
        <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
          {typedText}<span className="animate-pulse">_</span>
        </h1>
        
        <p className="text-lg text-[#888] mb-8 font-mono">
          /// BUSINESS IDEA GENERATOR ///
        </p>
      </div>

      {/* Main content */}
      <div className="w-full max-w-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Tell us what you have.<br />
          <span className="text-[#00ff9d]">We'll tell you what you can build.</span>
        </h2>
        
        <p className="text-lg text-[#aaa] mb-8">
          AI-powered business ideas tailored to your skills, budget, and goals.<br />
          No more "what should I do?" — get actionable ideas in seconds.
        </p>
        
        <p className="text-sm text-[#666] mb-8 font-mono">
          Launching Q2 2026 • Free tier coming
        </p>

        {/* Email signup */}
        <form className="flex flex-col sm:flex-row gap-3 justify-center mb-8" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="enter your email..." 
            className="px-4 py-3 bg-[#111] border border-[#333] rounded text-white font-mono text-sm w-full sm:w-64 focus:outline-none focus:border-[#00ff9d]"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-[#00ff9d] text-black font-bold font-mono text-sm rounded hover:bg-[#00cc7d] transition-colors"
          >
            JOIN WAITLIST
          </button>
        </form>

        <p className="text-xs text-[#444] mb-4 font-mono">
          First 100: Free business ideas forever ✨
        </p>

        {/* Social links - hidden for now, add later */}
        <div className="text-xs text-[#333] font-mono">
          @HEYWESTON
        </div>
      </div>

      {/* Footer hint */}
      <div className="absolute bottom-8 text-xs text-[#333] font-mono">
        // WESTON LABS [INTERNAL BUILD]
      </div>
    </main>
  );
}