import React, { useState, useEffect } from 'react';

function Timer(props) {
  const TIME_LIMIT = props.time;
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

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  };

  const { circumference, offset } = calculatePath(5, timeLeft);

  return (
    <div className="circular-timer">
      <svg className="circular-timer__svg" viewBox="0 0 100 100">
        <circle
          className="circular-timer__path-elapsed"
          cx="90"
          cy="6"
          r="5"
          stroke="#ccc"
          strokeWidth="1"
          fill="transparent"
        />
        <circle
          className="circular-timer__path-remaining"
          cx="94"
          cy="90"
          r="5"
          transform="rotate(-90 50 50)"
          stroke="#ff5f5f"
          strokeWidth="1"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text className="circular-timer__label" x="86.6" y="7">
          {formatTime(timeLeft)}
        </text>
      </svg>
    </div>
  );
}

export default Timer;
