# RelativeTime Component

A React component for displaying relative time (like "2 minutes ago") with optimal updating. Built with Next.js and TypeScript.

## Features

- **Smart Update Intervals** - Updates only when the displayed text would change, not at fixed intervals
- **Server-Side Rendering** - Works with Next.js App Router and server components
- **Client Hydration** - Hydrates on the client to enable dynamic updates
- **Memory Leak Prevention** - Properly cleans up timeouts when unmounting
- **Time Format Options** - Displays appropriate formats for seconds, minutes, hours, days, months, and years

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

## Usage

```tsx
import { RelativeTime } from "@/components/relative-time";

// Basic usage
<RelativeTime date={new Date(Date.now() - 5 * 60 * 1000)} />

// With a timestamp
<RelativeTime date={1659312000000} />

// With an ISO string
<RelativeTime date="2023-03-15T12:30:45Z" />
```

## How It Works

The component calculates the next meaningful update time based on the current relative time:

- For times less than a minute ago → updates every second
- For times in minutes → updates when the minute changes
- For times in hours → updates when the hour changes
- For times in days/months/years → follows similar boundary-based timing

This approach minimizes re-renders while keeping the displayed time accurate.

## Implementation Details

- Uses React's `useState` and `useEffect` hooks for state management
- Uses `useRef` to track timeout references for proper cleanup
- Includes `suppressHydrationWarning` to handle server/client time differences
- Extracts utility functions for time formatting and update calculations

## Running the Demo

The demo page includes:

1. An interactive date/time selector to test different times
2. Examples of various time periods (seconds to years)
3. Explanation of optimizations used

Check the browser console to see logs of when the component actually updates.

## Next.js Project

This is a [Next.js](https://nextjs.org) project using the App Router. Check out the [Next.js documentation](https://nextjs.org/docs) for more information on the framework.
