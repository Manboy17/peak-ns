export const calculatePeak = (
  date: Date
): {
  isPeakTime: boolean;
  nextChangeAt: Date;
} => {
  const currentTime = new Date(date);
  const day = currentTime.getDay();

  const nextMonday = new Date(date);
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  nextMonday.setHours(6, 30, 0, 0);
  nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);

  if (day === 6 || day === 0) {
    return {
      isPeakTime: false,
      nextChangeAt: nextMonday,
    };
  }

  const time0630 = new Date(date);
  time0630.setHours(6, 30, 0, 0);
  if (currentTime < time0630) {
    return {
      isPeakTime: false,
      nextChangeAt: time0630,
    };
  }

  const time0900 = new Date(date);
  time0900.setHours(9, 0, 0, 0);
  if (currentTime < time0900) {
    return {
      isPeakTime: true,
      nextChangeAt: time0900,
    };
  }

  const time1600 = new Date(date);
  time1600.setHours(16, 0, 0, 0);
  if (currentTime < time1600) {
    return {
      isPeakTime: false,
      nextChangeAt: time1600,
    };
  }

  const time1830 = new Date(date);
  time1830.setHours(18, 30, 0, 0);
  if (currentTime < time1830) {
    return {
      isPeakTime: true,
      nextChangeAt: time1830,
    };
  }

  const tomorrow = new Date(date);
  tomorrow.setHours(6, 30, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    isPeakTime: false,
    nextChangeAt: day === 5 ? nextMonday : tomorrow,
  };
};

// off-peak Monday-Friday:from 9am - 4pm, 6.30pm - 6.30am
// peak time - 6.30am - 9am, 4pm - 6.30pm
