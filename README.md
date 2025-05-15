# RelativeTime Component

A React component for displaying relative time (like "2 minutes ago") with optimal updating. Built with Next.js and TypeScript.

**GitHub Repository:** [github.com/brian-gates/relative-time](https://github.com/brian-gates/relative-time)

## Features

- **Smart Update Intervals** - Updates only when the displayed text would change, not at fixed intervals
- **Server-Side Rendering** - Works with Next.js App Router and server components
- **Client Hydration** - Hydrates on the client to enable dynamic updates
- **Memory Leak Prevention** - Properly cleans up timeouts when unmounting
- **Time Format Options** - Displays appropriate formats for seconds, minutes, hours, days, months, and years
- **Memoized Component** - Uses React.memo to prevent unnecessary re-renders when the date string hasn't changed

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

You can also visit the live demo at [briangates.me:4000](http://briangates.me:4000).

## Usage

```tsx
import { RelativeTime } from "@/components/relative-time";

<RelativeTime date="2023-03-15T12:30:45Z" />
<RelativeTime date={new Date(Date.now() - 2 * 60 * 1000).toISOString()} />
```

The component only accepts ISO string dates as input. This ensures consistent rendering between server and client components, preventing hydration mismatches that can occur with Date objects.

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
- Implements hydration-safe rendering that prevents server/client mismatches
- Uses `React.memo` with default shallow comparison for optimal re-rendering

## Preventing Hydration Mismatches

The component handles server/client hydration differences by:

1. Using the same formatting function for both server-side and client-side rendering
2. Using consistent ISO string dates as input rather than Date objects
3. Formatting dates in a predictable, locale-independent way

This approach ensures consistent rendering between server and client, avoiding React hydration errors while still enabling dynamic updates after hydration is complete.

## Running the Demo

The demo page includes:

1. An interactive date/time selector to test different times
2. Examples of various time periods (seconds to years)
3. Explanation of optimizations used

## Debugging and Visualizing Renders

To visualize component re-renders in real-time:

1. Open Chrome DevTools (F12 or Right-click → Inspect)
2. Click on the "Components" tab (you need React DevTools extension installed)
3. Click the gear icon (⚙️) in the top right corner
4. Check "Highlight updates when components render"
5. Interact with the page to see colored highlights when components re-render
   - Blue/green highlights indicate fast renders
   - Yellow/red highlights indicate slower renders that may need optimization

This feature makes it easy to visually confirm that the RelativeTime component only re-renders when the displayed text actually changes, not on every input change or parent re-render.

> **Note:** In development mode, React StrictMode (enabled by default in Next.js) will intentionally render components twice to help catch potential issues. This double-rendering only happens in development and won't occur in production builds.

Learn more about DevTools at [developer.chrome.com/docs/devtools](https://developer.chrome.com/docs/devtools).

## Deployment with PM2

To run this application in a production server environment using PM2:

### Installation

```bash
# Install PM2 globally
npm install -g pm2

# Build the Next.js application for production
npm run build
```

### Running with PM2

```bash
# Start the application with PM2
pm2 start npm --name "relative-time" -- start

# Alternative: directly use the Next.js start command
# pm2 start "npx next start -p 4000" --name "relative-time"
```

### Managing the Application

```bash
# Check status
pm2 status

# View logs
pm2 logs relative-time

# Restart application
pm2 restart relative-time

# Stop application
pm2 stop relative-time

# Delete application from PM2
pm2 delete relative-time
```

### Auto-restart on Server Reboot

```bash
# Generate startup script
pm2 startup

# Save the current PM2 process list
pm2 save
```

### PM2 Configuration File (Ecosystem)

Create a file named `ecosystem.config.js` in the project root:

```js
module.exports = {
  apps: [
    {
      name: "relative-time",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};
```

Start using the config file:

```bash
pm2 start ecosystem.config.js
```

## Next.js Project

This is a [Next.js](https://nextjs.org) project using the App Router. Check out the [Next.js documentation](https://nextjs.org/docs) for more information on the framework.
