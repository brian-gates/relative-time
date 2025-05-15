import { RelativeTime } from "@/components/relative-time";
import { TimeSelector } from "@/components/time-selector";

// Force dynamic rendering to calculate timestamps for each request
export const dynamic = "force-dynamic";

export default function Home() {
  // Calculate all timestamps on the server
  const now = new Date().toISOString();
  const thirtySecondsAgo = new Date(Date.now() - 30 * 1000).toISOString();
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
  const twoDaysAgo = new Date(
    Date.now() - 2 * 24 * 60 * 60 * 1000
  ).toISOString();
  const threeMonthsAgo = new Date(
    Date.now() - 90 * 24 * 60 * 60 * 1000
  ).toISOString();
  const twoYearsAgo = new Date(
    Date.now() - 2 * 365 * 24 * 60 * 60 * 1000
  ).toISOString();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Relative Time Component</h1>

        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href="https://github.com/brian-gates/relative-time"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            github.com/brian-gates/relative-time
          </a>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Interactive Demo</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select a date and time to see how the component displays it
            </p>
            <TimeSelector initialTime={now} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-medium">5 seconds ago:</div>
              <RelativeTime
                date={new Date(Date.now() - 5 * 1000).toISOString()}
              />

              <div className="font-medium">30 seconds ago:</div>
              <RelativeTime date={thirtySecondsAgo} />

              <div className="font-medium">2 minutes ago:</div>
              <RelativeTime date={twoMinutesAgo} />

              <div className="font-medium">3 hours ago:</div>
              <RelativeTime date={threeHoursAgo} />

              <div className="font-medium">2 days ago:</div>
              <RelativeTime date={twoDaysAgo} />

              <div className="font-medium">3 months ago:</div>
              <RelativeTime date={threeMonthsAgo} />

              <div className="font-medium">2 years ago:</div>
              <RelativeTime date={twoYearsAgo} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The RelativeTime component implements several optimizations for
                performance and user experience:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Smart Update Intervals</strong> - Updates only when
                  the displayed text would change, not on fixed intervals (e.g.,
                  seconds to minutes, minutes to hours)
                </li>
                <li>
                  <strong>Server-Side Rendering</strong> - Works with Next.js
                  App Router and server components for SEO and performance
                </li>
                <li>
                  <strong>Client Hydration</strong> - Hydrates on the client to
                  enable dynamic updates
                </li>
                <li>
                  <strong>Memory Leak Prevention</strong> - Properly cleans up
                  timeouts when unmounting
                </li>
                <li>
                  <strong>Time Format Options</strong> - Displays appropriate
                  formats for seconds, minutes, hours, days, months, and years
                </li>
                <li>
                  <strong>Memoized Component</strong> - Uses React.memo with a
                  custom comparison function that prevents re-renders when dates
                  would display the same text
                </li>
              </ul>

              <p className="mt-6">
                <strong>Efficient Rendering Approach</strong>
              </p>
              <p>
                This component intelligently renders relative time strings (like
                &ldquo;2 minutes ago&rdquo;) and keeps them up-to-date with
                minimal re-renders. Rather than using a fixed interval like
                setInterval, it precisely calculates <em>when</em> the text
                would actually change. For example:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  For times less than a minute old, it updates every second
                </li>
                <li>
                  For times in minutes, it waits until the next minute boundary
                </li>
                <li>
                  For times in hours, it waits until the next hour boundary
                </li>
                <li>
                  For days, months, and years, it follows similar optimizations
                </li>
              </ul>
              <p>
                This approach ensures the component updates only when necessary,
                improving performance by minimizing DOM operations and
                re-renders.
              </p>

              <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                      Visualize Component Renders
                    </h4>
                    <p className="text-blue-900 dark:text-blue-100 mb-3">
                      You can visualize the component&apos;s rendering behavior
                      using Chrome DevTools:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-blue-900 dark:text-blue-100">
                      <li>
                        Open Chrome DevTools (F12 or Right-click → Inspect)
                      </li>
                      <li>
                        Click on the &ldquo;Components&rdquo; tab (requires
                        React DevTools extension)
                      </li>
                      <li>Click the gear icon (⚙️) in the top right corner</li>
                      <li>
                        Check &ldquo;Highlight updates when components
                        render&rdquo;
                      </li>
                      <li>
                        Interact with the page to see colored highlights when
                        components re-render:
                        <ul className="list-disc pl-5 mt-2">
                          <li>Blue/green highlights indicate fast renders</li>
                          <li>
                            Yellow/red highlights indicate slower renders that
                            may need optimization
                          </li>
                        </ul>
                      </li>
                    </ol>
                    <p className="mt-3 text-blue-900 dark:text-blue-100">
                      This feature makes it easy to visually confirm that the
                      RelativeTime component only re-renders when the displayed
                      text actually changes, not on every input change or parent
                      re-render. Learn more about DevTools at{" "}
                      <a
                        href="https://developer.chrome.com/docs/devtools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        developer.chrome.com/docs/devtools
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
