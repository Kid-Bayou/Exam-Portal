import { useState, useEffect } from "react";

function ExamPage() {

  return (
    <div className="App">
      <h1>Animated Countdown Timer</h1>
      <CountdownTimer initialTime={60} />
    </div>
  );
}

export default ExamPage;
