import { IEvent } from "@/app/database/event.model";
import EventCard from "./EventCard";

export default async function EventsList() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });
  const { events } = await response.json();

  return (
    <ul className="events">
      {events.map((event: IEvent) => (
        <li key={event.title} className="list-none">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}
