import { useEffect, useState } from "react";
import { calculatePeak } from "./calculatePeak";

interface CountDownProps {
  isPeakTime: boolean;
  onPeakTimeChange: (value: boolean) => void;
}

export const CountDown = ({ isPeakTime, onPeakTimeChange }: CountDownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = new Date();

      const { isPeakTime, nextChangeAt: nextPeakTime } =
        calculatePeak(currentTime);

      onPeakTimeChange(isPeakTime);

      const difference = nextPeakTime.getTime() - currentTime.getTime();
      const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursDifference = Math.floor((difference / (1000 * 60 * 60)) % 24);
      setTimeLeft({
        hours: daysDifference * 24 + hoursDifference,
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
      <span className={`${isPeakTime ? "text-[#FFC917]" : "text-[#003082]"}`}>
        {timeLeft.hours}:
        {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
        {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
      </span>
    </div>
  );
};
