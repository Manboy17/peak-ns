import { useEffect, useState } from "react";
import { calculatePeak } from "./calculatePeak";

interface CountDownProps {
  onPeakTimeChange: (value: boolean) => void;
}

export const CountDown = ({ onPeakTimeChange }: CountDownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = new Date();

      const { isPeakTime, nextChangeAt: nextPeakTime } = calculatePeak();

      onPeakTimeChange(isPeakTime);

      const difference = nextPeakTime.getTime() - currentTime.getTime();
      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();

    const intervalid = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalid);
  }, [onPeakTimeChange]);
  return (
    <div>
      <span>
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </span>
    </div>
  );
};

// off-peak before 6.30am, between 9.00am and 4pm and after 6pm
