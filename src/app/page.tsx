import { RelativeTime } from "@/components/relative-time";
import { TimeSelector } from "@/components/time-selector";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Relative Time Component</h1>

        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href="http://briangates.me:4000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            briangates.me:4000
          </a>
          <a
            href="https://github.com/brian-gates/relative-time"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
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
            <TimeSelector />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-medium">5 seconds ago:</div>
              <RelativeTime date={new Date(Date.now() - 5 * 1000)} />

              <div className="font-medium">30 seconds ago:</div>
              <RelativeTime date={new Date(Date.now() - 30 * 1000)} />

              <div className="font-medium">2 minutes ago:</div>
              <RelativeTime date={new Date(Date.now() - 2 * 60 * 1000)} />

              <div className="font-medium">3 hours ago:</div>
              <RelativeTime date={new Date(Date.now() - 3 * 60 * 60 * 1000)} />

              <div className="font-medium">2 days ago:</div>
              <RelativeTime
                date={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)}
              />

              <div className="font-medium">3 months ago:</div>
              <RelativeTime
                date={new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)}
              />

              <div className="font-medium">2 years ago:</div>
              <RelativeTime
                date={new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000)}
              />
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
                The component is also wrapped in <code>React.memo</code> with a
                custom comparison function that checks if two different date
                values would produce the same formatted text (like &ldquo;2
                minutes ago&rdquo;). If they would, React skips re-rendering
                entirely, even when the date reference changes.
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
