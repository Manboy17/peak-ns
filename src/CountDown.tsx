import { useEffect, useState } from "react";

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
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      const isPeakTime =
        (hours >= 6 && minutes >= 30 && hours < 9) ||
        (hours >= 16 && hours < 18);

      onPeakTimeChange(isPeakTime);

      const nextPeakTime = new Date(currentTime);
      if (hours < 6 || (hours >= 6 && minutes < 30)) {
        nextPeakTime.setHours(6, 30, 0);
      } else if (hours >= 9 && hours < 16) {
        nextPeakTime.setHours(16, 0, 0);
      } else if (hours >= 18) {
        nextPeakTime.setHours(6, 30, 0);
        nextPeakTime.setDate(nextPeakTime.getDate() + 1);
      }

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
