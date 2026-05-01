import { Suspense } from "react";
import { IEvent } from "@/app/database/event.model";
import EventsClient from "./EventsClient";
import EventCardSkeleton from "./EventCardSkeleton";

/* ── Server component: fetches events, hands off to client ── */
async function EventsData() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  let events: (IEvent & { _id: string })[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/events`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    events = data.events ?? [];
  } catch {
    return (
      <div className="empty-state">
        <p>Failed to load events. Please refresh the page.</p>
      </div>
    );
  }

  return <EventsClient events={events} />;
}

/* ── Skeleton shown while EventsData streams in ─────────── */
function EventsGridSkeleton() {
  return (
    <div className="events-container">
      {/* Search bar skeleton */}
      <div className="search-filter-bar">
        <div
          className="h-10 w-full max-w-sm rounded-lg animate-pulse"
          style={{ background: "var(--color-dark-200)" }}
        />
      </div>
      {/* Card skeletons */}
      <ul className="events">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="list-none">
            <EventCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EventsList() {
  return (
    <Suspense fallback={<EventsGridSkeleton />}>
      <EventsData />
    </Suspense>
  );
}
