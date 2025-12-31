import { useEffect, useState } from 'react';

const HeroOverlay = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute left-0 top-0 w-1/2 h-full pointer-events-none z-10 flex flex-col justify-center pl-8 md:pl-16 lg:pl-24">
      {/* Main Content */}
      <div 
        className={`max-w-lg transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-wider mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-glow-cyan">
            NEXUS-7
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90 mb-6">
          AI Robot Companion
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
          Move your cursor around the screen and watch the robot follow your movements in real-time. 
          A futuristic companion powered by advanced technology.
        </p>
        
        <div className="flex flex-wrap gap-4 pointer-events-auto">
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/40">
            Get Started
          </button>
          <button className="px-6 py-3 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors">
            Learn More
          </button>
        </div>
        
        {/* Stats */}
        <div className="mt-12 flex items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">100+</div>
            <div className="text-sm text-muted-foreground">Features</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400">∞</div>
            <div className="text-sm text-muted-foreground">Possibilities</div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="mt-8 flex items-center gap-6 text-xs tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-muted-foreground">ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-muted-foreground">TRACKING</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-muted-foreground">READY</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-cyan-500/40" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-purple-500/40" />
    </div>
  );
};

export default HeroOverlay;