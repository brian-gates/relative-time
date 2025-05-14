"use client";

import { formatRelativeTime, getNextUpdateTime } from "@/utils/time";
import React, { useEffect, useMemo, useRef, useState } from "react";

// Component implementation that handles the actual rendering and updates
function RelativeTimeComponent({ date }: { date: Date | string | number }) {
  const dateObj = useMemo(
    () => (date instanceof Date ? date : new Date(date)),
    [date]
  );
  const initialValue = formatRelativeTime(dateObj);
  const [formattedDate, setFormattedDate] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // Only run after initial hydration to prevent mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    function updateDisplay() {
      const newFormattedValue = formatRelativeTime(dateObj);

      if (newFormattedValue !== formattedDate) {
        setFormattedDate(newFormattedValue);
      }

      const msUntilNextUpdate = getNextUpdateTime(dateObj);
      timeoutRef.current = setTimeout(updateDisplay, msUntilNextUpdate);
    }

    updateDisplay();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dateObj, formattedDate, isMounted]);

  // During SSR and first render, use static ISO string
  // After hydration completes, use the client-side calculated value
  return (
    <time dateTime={dateObj.toISOString()} title={dateObj.toLocaleString()}>
      {isMounted ? formattedDate : dateObj.toISOString()}
    </time>
  );
}

// Custom comparison function that only causes re-renders when the formatted text would change
const arePropsEqual = (
  prevProps: { date: Date | string | number },
  nextProps: { date: Date | string | number }
) => {
  const prevDate =
    prevProps.date instanceof Date ? prevProps.date : new Date(prevProps.date);
  const nextDate =
    nextProps.date instanceof Date ? nextProps.date : new Date(nextProps.date);

  // Only re-render if the formatted display text would be different
  const prevText = formatRelativeTime(prevDate);
  const nextText = formatRelativeTime(nextDate);

  return prevText === nextText;
};

// Export a memoized version of the component that only re-renders when
// the formatted text would actually change, not just when the date prop changes
// Note: In development mode with StrictMode enabled (default in Next.js),
// you'll see components render twice. This is intentional behavior to help
// detect issues and won't happen in production.
export const RelativeTime = React.memo(RelativeTimeComponent, arePropsEqual);
