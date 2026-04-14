import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/app/database/event.model";

const page = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/api/events`, { cache: "no-store" });
  const { events } = await response.json();
  return (
    <>
      <section className="p-10">
        <h1 className="text-center mt-10">
          The Hub for every Dev <br /> Event you can&apos;t miss
        </h1>
        <p className="text-center mt-10">
          Hackathons, Meetups and Conferences, All in one place!
        </p>
        <ExploreBtn />
        <div className="mt-10 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events">
            {events.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
