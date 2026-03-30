import React from 'react';
import Lottie from 'lottie-react';

// A simple smoke-like animation data (placeholder if no JSON provided)
// Since I can't upload a JSON, I'll use a public URL or a simplified CSS animation
// But lottie-react needs a JSON. I'll search for a public smoke lottie JSON or use a CSS one.
// For now, let's use a CSS-based smoke overlay to ensure it works without external assets.

export const SmokeOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 smoke-layer pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-pulse" />
      {/* We can simulate smoke with moving radial gradients */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30 animate-[spin_60s_linear_infinite]"
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 50%)',
             filter: 'blur(60px)'
           }} />
      <div className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] opacity-20 animate-[spin_45s_linear_infinite_reverse]"
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(200,200,200,0.5) 0%, transparent 60%)',
             filter: 'blur(80px)'
           }} />
    </div>
  );
};

export const SmokePuff: React.FC<{ x: number, y: number, onComplete: () => void }> = ({ x, y, onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed z-50 pointer-events-none animate-out fade-out zoom-out duration-500"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="w-12 h-12 bg-white/40 rounded-full blur-xl animate-ping" />
    </div>
  );
};
