import { useMemo } from 'react';

export const useTimeOfDay = (time) => {

  const timeOfDay = useMemo(() => {
      if (!time) return 'day';
  
      const hour = time.getHours();
      if (hour >= 5 && hour < 8) return 'morning';
      if (hour >= 8 && hour < 18) return 'day';
      if (hour >= 18 && hour < 20) return 'sunset';
      return 'night';
    }, [time]);


  return { timeOfDay };
};