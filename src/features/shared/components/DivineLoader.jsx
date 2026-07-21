import React from "react";

const DivineLoader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Camera Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-lg shadow-gold/20 animate-pulse-slow">
            <svg className="w-10 h-10 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          {/* Spinning ring */}
          <div className="absolute -inset-2 rounded-2xl border-2 border-transparent border-t-gold border-r-gold/40 animate-spin-slow" />
        </div>

        {/* DivineCapture Text with animation */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-charcoal tracking-wide">
            <span className="inline-block animate-charFade" style={{ animationDelay: "0s" }}>D</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.1s" }}>i</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.2s" }}>v</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.3s" }}>i</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.4s" }}>n</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.5s" }}>e</span>
            <span className="inline-block text-gold mx-1.5 animate-charFade" style={{ animationDelay: "0.6s" }}>C</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.7s" }}>a</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.8s" }}>p</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "0.9s" }}>t</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "1.0s" }}>u</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "1.1s" }}>r</span>
            <span className="inline-block animate-charFade" style={{ animationDelay: "1.2s" }}>e</span>
          </h2>
          <p className="text-charcoal/50 text-sm mt-2 font-medium">{message}</p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gold animate-bounce-dot" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 rounded-full bg-gold/70 animate-bounce-dot" style={{ animationDelay: "0.15s" }} />
          <div className="w-2 h-2 rounded-full bg-gold/40 animate-bounce-dot" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes charFade {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.4; transform: translateY(-3px); }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
        .animate-charFade {
          animation: charFade 2s ease-in-out infinite;
        }
        .animate-bounce-dot {
          animation: bounce-dot 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DivineLoader;