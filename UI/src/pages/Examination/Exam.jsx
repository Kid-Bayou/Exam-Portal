import { useState, useEffect } from "react";
import Timer from "./Timer"

function Exam() {

  return (
    <div className="App">
      <h1>Animated Countdown Timer</h1>
      <Timer initialTime={60} />
    </div>
  );
}

export default Exam;
