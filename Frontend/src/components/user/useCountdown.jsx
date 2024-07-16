import { useState, useEffect } from 'react';

function useCountdown(endDate) {
  const calculateRemainingTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    
    // If end date is today, set end time to 23:59:59 of today
    if (end.toDateString() === now.toDateString()) {
      end.setHours(23, 59, 59, 999);
    }
    
    const difference = end - now;

    if (difference <= 0) return null;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const time = calculateRemainingTime(endDate);
      if (time) {
        setRemainingTime(time);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return remainingTime;
}

export default useCountdown;
