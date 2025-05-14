import { RelativeTime } from "@/components/relative-time";
import { TimeSelector } from "@/components/time-selector";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Relative Time Component</h1>

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
            <h2 className="text-xl font-semibold">Optimizations</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The RelativeTime component implements several optimizations for
                performance and user experience:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Smart update intervals</strong> - Updates only when
                  the displayed text would change, not on fixed intervals (e.g.,
                  seconds to minutes, minutes to hours)
                </li>
                <li>
                  <strong>Initial server rendering</strong> - First render
                  happens on the server for SEO and performance, then hydrates
                  on the client
                </li>
                <li>
                  <strong>Precise timeout management</strong> - Uses React
                  useRef to track timeouts and properly clean them up to prevent
                  memory leaks
                </li>
                <li>
                  <strong>Minimal state updates</strong> - Updates state only
                  when necessary to avoid unnecessary re-renders
                </li>
                <li>
                  <strong>Hydration compatibility</strong> - Uses
                  suppressHydrationWarning to handle the time difference between
                  server and client rendering
                </li>
              </ul>

              <p className="mt-6">
                <strong>Efficient Rendering Approach</strong>
              </p>
              <p>
                This component intelligently renders relative time strings (like
                "2 minutes ago") and keeps them up-to-date with minimal
                re-renders. Rather than using a fixed interval like setInterval,
                it precisely calculates <em>when</em> the text would actually
                change. For example:
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
                Open your browser's console to see log messages whenever the
                component re-renders. You'll notice it only updates when the
                displayed text actually changes, not at arbitrary intervals.
                This approach significantly reduces unnecessary renders and DOM
                updates while keeping the displayed time accurate.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
