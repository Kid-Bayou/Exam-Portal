import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ExamContext } from "../../../context/ExamContext";
import {useContext} from "react"



const renderTime = ({ remainingTime }) => {
  const hours = String(Math.floor(remainingTime / 3600)).padStart(2,"0");
  const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(2,"0");
  const seconds = String(remainingTime % 60).padStart(2,"0");
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="value">{`${hours}:${minutes}:${seconds}`}</div>
    </div>
  );
};

function Timer() {
  const { timer, setTimer } = useContext(ExamContext);
  return (
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={timer}
          rotation = {"counterclockwise"}
          size={70}
          strokeWidth={5}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 5 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
  );
}

export default Timer
