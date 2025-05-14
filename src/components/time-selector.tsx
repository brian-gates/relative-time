"use client";

import { RelativeTime } from "@/components/relative-time";
import { useCallback, useMemo, useState } from "react";

export function TimeSelector({ initialTime }: { initialTime: string }) {
  // Initialize with the timestamp from the server
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(initialTime));

  // Memoize the ISO string to maintain reference equality
  const selectedDateISO = useMemo(
    () => selectedDate.toISOString(),
    [selectedDate]
  );

  const formattedDateTime = useMemo(
    () => formatDateTimeLocal(selectedDate),
    [selectedDate]
  );

  // Memoize the change handler to avoid recreating on each render
  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = new Date(e.target.value);
      // Only update if the date actually changed
      if (newDate.getTime() !== selectedDate.getTime()) {
        setSelectedDate(newDate);
      }
    },
    [selectedDate]
  );

  return (
    <div className="space-y-6 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="date-input" className="font-medium min-w-[100px]">
          Select a date:
        </label>
        <input
          id="date-input"
          type="datetime-local"
          value={formattedDateTime}
          onChange={handleDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 transition-opacity duration-300"
          step="1"
        />
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="font-medium">Selected time:</div>
          <div className="transition-opacity duration-300">
            {selectedDate.toLocaleString()}
          </div>

          <div className="font-medium">Relative display:</div>
          <RelativeTime date={selectedDateISO} />
        </div>
      </div>
    </div>
  );
}

// Helper function to format dates for datetime-local input
function formatDateTimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
