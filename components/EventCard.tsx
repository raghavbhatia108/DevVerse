import Image from "next/image";
import Link from "next/link";
import { ModeBadge } from "./ui/Badge";
import BookmarkButton from "./BookmarkButton";
import { formatDate, formatTime } from "@/lib/utils";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  tags?: string[];
}

const EventCard = ({ title, image, slug, location, date, time, mode }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card" className="group">
      {/* Image + overlays */}
      <div className="card-image-wrap">
        <Image
          src={image}
          alt={title}
          width={410}
          height={220}
          className="poster"
        />
        <div className="card-badges">
          <ModeBadge mode={mode} />
        </div>
        <div className="card-bookmark">
          <BookmarkButton slug={slug} />
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-location">
          <Image
            src="/icons/pin.svg"
            alt=""
            aria-hidden="true"
            width={12}
            height={12}
            style={{ width: "auto", height: "auto" }}
          />
          <span>{location}</span>
        </div>

        <p className="title">{title}</p>

        <div className="datetime">
          <div>
            <Image
              src="/icons/calendar.svg"
              alt=""
              aria-hidden="true"
              width={13}
              height={13}
              style={{ width: "auto", height: "auto" }}
            />
            <span>{formatDate(date)}</span>
          </div>
          <div>
            <Image
              src="/icons/clock.svg"
              alt=""
              aria-hidden="true"
              width={13}
              height={13}
              style={{ width: "auto", height: "auto" }}
            />
            <span>{formatTime(time)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
