import { notFound } from "next/navigation";

const EventDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: "no-store",
  });
  const { event } = await request.json();
  if (!event) return notFound();

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
};

export default EventDetailsPage;
