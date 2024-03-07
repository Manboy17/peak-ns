import { useState } from "react";
import "./App.css";
import { CountDown } from "./CountDown";

function App() {
  const [isPeakTime, setIsPeakTime] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-y-5">
      {isPeakTime ? (
        <h1 className="text-2xl font-medium">Now is a peak time!</h1>
      ) : (
        <h1 className="text-2xl font-medium">Now is an off-peak time!</h1>
      )}
      <span className="text-lg">
        {isPeakTime ? <span>Off-peak</span> : <span>Peak</span>} time will be
        in:
      </span>
      <CountDown onPeakTimeChange={(v) => setIsPeakTime(v)} />
    </div>
  );
}

export default App;
