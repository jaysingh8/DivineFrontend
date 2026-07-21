import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiresAt, onExpired }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!expiresAt) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft({ expired: true });
        if (onExpired) onExpired();
        return null;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ minutes, seconds, expired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (!timeLeft || timeLeft.expired) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-red-500 font-medium">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Expired
      </span>
    );
  }

  const isUrgent = timeLeft.minutes < 3;

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
      isUrgent ? "text-red-500" : "text-amber-500"
    }`}>
      <svg className={`w-3 h-3 ${isUrgent ? "animate-pulse" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, "0")}
    </span>
  );
};

export default CountdownTimer;