import React, { useState, useEffect } from 'react';

const TIME_LIMIT = 7000; // Time in seconds

function Timer() {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const calculatePath = (radius, progress) => {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / TIME_LIMIT) * circumference;
    return { circumference, offset };
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return formattedTime;
  };
  

  const { circumference, offset } = calculatePath(45, timeLeft);

  return (
    <div className="circular-timer">
      <svg className="circular-timer__svg" viewBox="0 0 100 100">
        <circle
          className="circular-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
          stroke="#ccc"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          className="circular-timer__path-remaining"
          cx="50"
          cy="50"
          r="45"
          transform="rotate(-90 50 50)"
          stroke="#ff5f5f"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text className="circular-timer__label" x="50" y="55">
        {formatTime(timeLeft)}
        </text>
      </svg>
    </div>
  );
}

export default Timer;
