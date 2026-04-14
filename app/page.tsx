import { Suspense } from "react";
import ExploreBtn from "@/components/ExploreBtn";
import EventsList from "@/components/EventsList";

const page = () => {
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
          <Suspense
            fallback={
              <div className="text-center py-10">Loading events...</div>
            }
          >
            <EventsList />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default page;
