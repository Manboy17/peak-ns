export const calculatePeak = (): {
  isPeakTime: boolean;
  nextChangeAt: Date;
} => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const isPeakTime =
    (hours >= 6 && minutes >= 30 && hours < 9) || (hours >= 16 && hours < 18);

  const nextPeakTime = new Date(currentTime);
  if (hours < 6 || (hours >= 6 && minutes < 30)) {
    nextPeakTime.setHours(6, 30, 0);
  } else if (hours >= 9 && hours < 16) {
    nextPeakTime.setHours(16, 0, 0);
  } else if (hours >= 18) {
    nextPeakTime.setHours(6, 30, 0);
    nextPeakTime.setDate(nextPeakTime.getDate() + 1);
  }

  return {
    isPeakTime,
    nextChangeAt: nextPeakTime,
  };
};
