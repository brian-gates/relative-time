"use client";

import { formatRelativeTime, getNextUpdateTime } from "@/utils/time";
import React, { useEffect, useMemo, useRef, useState } from "react";

// Component implementation that handles the actual rendering and updates
function RelativeTimeComponent({ date }: { date: string }) {
  const dateObj = useMemo(() => new Date(date), [date]);

  // Format immediately using the same function that will be used on both server and client
  // This ensures SSR and client render show identical content
  const initialFormattedValue = formatRelativeTime(dateObj);

  const [formattedDate, setFormattedDate] = useState(initialFormattedValue);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Store the last update timestamp to prevent redundant updates
  const lastUpdateRef = useRef<number>(Date.now());

  // Set mounted flag without changing the formatted date
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track date changes and update display when necessary
  useEffect(() => {
    if (!isMounted) return;

    // Reset the formatted date when date prop changes
    const newFormattedValue = formatRelativeTime(dateObj);
    if (newFormattedValue !== formattedDate) {
      setFormattedDate(newFormattedValue);
    }

    function updateDisplay() {
      // Check if sufficient time has passed since last update (at least 900ms)
      // This prevents multiple updates within the same second
      const now = Date.now();
      if (now - lastUpdateRef.current < 900) {
        // Schedule another check shortly
        timeoutRef.current = setTimeout(updateDisplay, 1000);
        return;
      }

      const newFormattedValue = formatRelativeTime(dateObj);

      // Only update state if the formatted text would actually change
      if (newFormattedValue !== formattedDate) {
        setFormattedDate(newFormattedValue);
        lastUpdateRef.current = now;
      }

      const msUntilNextUpdate = getNextUpdateTime(dateObj);
      // Add a small buffer to avoid edge cases
      timeoutRef.current = setTimeout(updateDisplay, msUntilNextUpdate + 100);
    }

    // Schedule the next update
    const msUntilNextUpdate = getNextUpdateTime(dateObj);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(updateDisplay, msUntilNextUpdate);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dateObj, formattedDate, isMounted]);

  return (
    <time dateTime={dateObj.toISOString()} title={dateObj.toLocaleString()}>
      {formattedDate}
    </time>
  );
}

// Improved comparison function that strictly checks date equality
const arePropsEqual = (
  prevProps: { date: string },
  nextProps: { date: string }
) => {
  // If the ISO strings are identical, they're definitely equal
  if (prevProps.date === nextProps.date) {
    return true;
  }

  // Parse the dates
  const prevDate = new Date(prevProps.date);
  const nextDate = new Date(nextProps.date);

  // Compare actual time values rather than references
  if (prevDate.getTime() === nextDate.getTime()) {
    return true;
  }

  // Finally, compare the formatted output - only re-render if it would change
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
