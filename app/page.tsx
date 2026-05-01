import { Suspense } from "react";
import ExploreBtn from "@/components/ExploreBtn";
import EventsList from "@/components/EventsList";

export default function HomePage() {
  return (
    <div className="page-wrapper">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="hero-section">
        <span className="hero-eyebrow">🚀 Developer Events Hub</span>

        <h1>
          The Hub for every Dev
          <br />
          Event you can&apos;t miss
        </h1>

        <p className="hero-subtext">
          Hackathons, Meetups, and Conferences — all in one place.{" "}
          Discover and register for events that shape your career.
        </p>

        <ExploreBtn />

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">500+</span>
            <span className="hero-stat-label">Events</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">80+</span>
            <span className="hero-stat-label">Cities</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">10K+</span>
            <span className="hero-stat-label">Developers</span>
          </div>
        </div>
      </section>

      {/* ── Events section ──────────────────────────────────── */}
      <section className="events-section">
        <div className="section-header">
          <div>
            <h3>Featured Events</h3>
            <p className="section-desc">
              Upcoming events curated for developers
            </p>
          </div>
        </div>

        <Suspense fallback={null}>
          <EventsList />
        </Suspense>
      </section>

    </div>
  );
}
