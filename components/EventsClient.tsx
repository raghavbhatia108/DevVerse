"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { IEvent } from "@/app/database/event.model";
import EventCard from "./EventCard";

type EventWithId = IEvent & { _id: string };

interface Props {
  events: EventWithId[];
}

export default function EventsClient({ events }: Props) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  /* Collect unique tags from all events (max 14) */
  const allTags = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => e.tags?.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 14);
  }, [events]);

  /* Filter events by search text and active tag */
  const filtered = useMemo(
    () =>
      events.filter((e) => {
        const matchSearch =
          !search || e.title.toLowerCase().includes(search.toLowerCase());
        const matchTag = !activeTag || e.tags?.includes(activeTag);
        return matchSearch && matchTag;
      }),
    [events, search, activeTag]
  );

  return (
    <div className="events-container">
      {/* ── Search + Filter bar ─────────────────────────── */}
      <div className="search-filter-bar">
        <div className="search-input-wrap">
          <Search size={15} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search events…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            aria-label="Search events"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="search-clear"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="tag-filter-row">
            <button
              className={`tag-chip${!activeTag ? " tag-chip--active" : ""}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-chip${activeTag === tag ? " tag-chip--active" : ""}`}
                onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Results ─────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No events match your search.</p>
          <button
            onClick={() => {
              setSearch("");
              setActiveTag(null);
            }}
            className="btn-ghost"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="events" id="events">
          {filtered.map((event) => (
            <li key={String(event._id)} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
