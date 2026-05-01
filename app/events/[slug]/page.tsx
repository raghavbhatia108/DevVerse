import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { ModeBadge } from "@/components/ui/Badge";
import { getSimilarEventsBySlug } from "@/lib/actions/events.actions";
import { getBookingCount } from "@/lib/actions/booking.actions";
import { IEvent } from "@/app/database/event.model";
import EventCard from "@/components/EventCard";
import { formatDate, formatTime } from "@/lib/utils";

/* ─── Sub-components ──────────────────────────────────────────── */

const DetailRow = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="detail-row">
    <Image
      src={icon}
      alt={alt}
      width={16}
      height={16}
      style={{ width: "auto", height: "auto" }}
    />
    <span>{label}</span>
  </div>
);

const AgendaSection = ({ agenda }: { agenda: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agenda.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const TagsRow = ({ tags }: { tags: string[] }) => (
  <div className="tags-row">
    {tags.map((tag) => (
      <span className="pill" key={tag}>
        {tag}
      </span>
    ))}
  </div>
);

/* ─── Helpers ─────────────────────────────────────────────────── */

function parseArrayField(value: string[] | string | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    if (value.length === 1) {
      try {
        const parsed = JSON.parse(value[0]);
        if (Array.isArray(parsed)) return parsed as string[];
      } catch {
        /* not JSON — treat as plain array */
      }
    }
    return value;
  }
  try {
    const parsed = JSON.parse(value as string);
    return Array.isArray(parsed) ? (parsed as string[]) : [value as string];
  } catch {
    return [value as string];
  }
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/* ─── Main content (async server component) ───────────────────── */

const EventDetailsContent = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  /* Fetch event */
  let event: IEvent | null = null;
  try {
    const res = await fetch(`${getBaseUrl()}/api/events/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(`API ${res.status}`);
    event = (await res.json()).event ?? null;
  } catch (err) {
    const digest = (err as { digest?: string })?.digest ?? "";
    if (digest.startsWith("NEXT_NOT_FOUND")) throw err;
    throw new Error("Failed to load event. Please try again later.");
  }

  if (!event) notFound();

  const {
    _id,
    title,
    description,
    image,
    overview,
    date,
    time,
    location,
    venue,
    mode,
    audience,
    organizer,
  } = event as IEvent & { _id: string };

  const agenda = parseArrayField((event as IEvent).agenda);
  const tags = parseArrayField((event as IEvent).tags);

  const [similarEvents, bookingCount] = await Promise.all([
    getSimilarEventsBySlug(slug),
    getBookingCount(slug),
  ]);

  return (
    <article id="event">
      {/* ── Breadcrumb ──────────────────────────────────── */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#events">Events</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      {/* ── Event header ────────────────────────────────── */}
      <div className="event-header-meta">
        <ModeBadge mode={mode} />
      </div>
      <div className="flex flex-col gap-4 py-8">
        <h1 className="event-title" style={{ fontSize: "3rem" }}>
          {title}
        </h1>
        <p className="event-description text-muted">{description}</p>
      </div>

      {/* ── Two-column layout ───────────────────────────── */}
      <div className="details">
        {/* Left: content */}
        <div className="content">
          <Image
            src={image}
            alt={title}
            width={800}
            height={400}
            className="banner"
            loading="eager"
            style={{ width: "100%", height: "auto" }}
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <div className="detail-grid">
              <DetailRow
                icon="/icons/calendar.svg"
                alt="Date"
                label={formatDate(date)}
              />
              <DetailRow
                icon="/icons/clock.svg"
                alt="Time"
                label={formatTime(time)}
              />
              <DetailRow
                icon="/icons/pin.svg"
                alt="Location"
                label={`${venue ? venue + ", " : ""}${location}`}
              />
              <DetailRow
                icon="/icons/mode.svg"
                alt="Mode"
                label={mode.charAt(0).toUpperCase() + mode.slice(1)}
              />
              <DetailRow
                icon="/icons/audience.svg"
                alt="Audience"
                label={audience}
              />
            </div>
          </section>

          {agenda.length > 0 && <AgendaSection agenda={agenda} />}

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          {tags.length > 0 && <TagsRow tags={tags} />}
        </div>

        {/* Right: sticky booking card */}
        <aside className="booking">
          <div className="signup-card">
            <p className="signup-card-label">Secure your spot</p>
            <h2>Book your Spot!</h2>
            {bookingCount > 0 ? (
              <p className="text-sm text-light-200">
                <span className="text-primary font-semibold">
                  {bookingCount}
                </span>{" "}
                {bookingCount === 1 ? "person has" : "people have"} already
                registered.
              </p>
            ) : (
              <p className="text-sm text-light-200">
                Be the first to register for this event!
              </p>
            )}
            <BookEvent eventId={String(_id)} />
          </div>
        </aside>
      </div>

      {/* ── Similar events ──────────────────────────────── */}
      {(similarEvents as IEvent[]).length > 0 && (
        <section className="similar-events">
          <h2>Similar Events You Might Like</h2>
          <ul className="events">
            {(similarEvents as IEvent[]).map((e) => (
              <li
                key={String((e as IEvent & { _id: string })._id)}
                className="list-none"
              >
                <EventCard {...e} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

/* ─── Skeleton ────────────────────────────────────────────────── */
const EventDetailSkeleton = () => (
  <div className="event-skeleton animate-pulse">
    <div className="h-4 w-48 rounded bg-dark-200 mb-8" />
    <div className="h-8 w-2/3 rounded bg-dark-200 mb-3" />
    <div className="h-4 w-1/2 rounded bg-dark-200 mb-12" />
    <div className="flex gap-12 flex-col lg:flex-row">
      <div className="flex-[2] flex flex-col gap-8">
        <div className="h-[320px] w-full rounded-xl bg-dark-200" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 rounded bg-dark-200"
              style={{ width: `${90 - i * 10}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="h-72 rounded-xl bg-dark-200" />
      </div>
    </div>
  </div>
);

/* ─── Page export ─────────────────────────────────────────────── */
const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => (
  <Suspense fallback={<EventDetailSkeleton />}>
    <EventDetailsContent params={params} />
  </Suspense>
);

export default EventDetailsPage;
