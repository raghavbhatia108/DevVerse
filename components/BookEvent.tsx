"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { FormEvent, useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const { success, error: bookingError } = await createBooking({
      eventId,
      slug,
      email,
    });

    console.log("Booking response:", { success, bookingError });

    if (success) {
      setSubmitted(true);
    } else {
      setError(
        typeof bookingError === "string"
          ? bookingError
          : String(bookingError || "Booking failed"),
      );
      console.error("Booking failed:", bookingError);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        "Thank you for signing up!"
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
