"use client";

import { formatRelativeTime, getNextUpdateTime } from "@/utils/time";
import { useEffect, useRef, useState } from "react";

export function RelativeTime({ date }: { date: Date | string | number }) {
  const dateObj = date instanceof Date ? date : new Date(date);
  const initialValue = formatRelativeTime(dateObj);
  const [formattedDate, setFormattedDate] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function updateDisplay() {
      const newFormattedValue = formatRelativeTime(dateObj);
      setFormattedDate(newFormattedValue);

      const msUntilNextUpdate = getNextUpdateTime(dateObj);

      timeoutRef.current = setTimeout(updateDisplay, msUntilNextUpdate);
    }

    updateDisplay();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dateObj]);

  console.log(`Re-rendered: ${formattedDate} ${dateObj.toISOString()}`);

  return (
    <time
      dateTime={dateObj.toISOString()}
      title={dateObj.toLocaleString()}
      suppressHydrationWarning
    >
      {formattedDate}
    </time>
  );
}
