import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/events.actions";
import { IEvent } from "@/app/database/event.model";
import EventCard from "@/components/EventCard";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2">
    <Image
      src={icon}
      alt={alt}
      width={17}
      height={17}
      style={{ width: "auto", height: "auto" }}
    />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agenda }: { agenda: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agenda.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row-gap-2 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsContent = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: "no-store",
  });
  const response = await request.json();

  const {
    event: {
      _id,
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      organizer,
      tags,
    },
  } = response;

  if (!description || !image || !overview || !date || !time || !location) {
    notFound();
  }

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  const bookings = 10;

  return (
    <section id="event" className="p-10">
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event"
            width={500}
            height={500}
            className="banner"
            loading="eager"
            style={{ width: "auto", height: "auto" }}
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="Date"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="Time" label={time} />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="Location"
              label={location}
            />
            <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={mode} />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="Audience"
              label={audience}
            />
          </section>
          <EventAgenda agenda={JSON.parse(agenda[0])} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={JSON.parse(tags[0])} />
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book your Spot!</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                {bookings} people have already booked for this event.
              </p>
            ) : (
              <p className="text-sm">
                Be the first one to book for this event!
              </p>
            )}
            <BookEvent eventId={_id} slug={slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-10">
        <h2>Similar Events You Might Like</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => (
  <Suspense
    fallback={<div className="text-center py-10">Loading event...</div>}
  >
    <EventDetailsContent params={params} />
  </Suspense>
);

export default EventDetailsPage;
