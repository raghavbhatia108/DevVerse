import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

const page = () => {
  return (
    <>
      <section>
        <h1 className="text-center mt-10">
          The Hub for every Dev <br /> Event you can&apos;t miss
        </h1>
        <p className="text-center mt-10">
          Hackathons, Meetups and Conferences, All in one place!
        </p>
        <ExploreBtn />
        <div className="mt-10 space-y-7 px-10">
          <h3>Featured Events</h3>
          <ul className="events">
            {events.map((event) => (
              <li key={event.title}>
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
