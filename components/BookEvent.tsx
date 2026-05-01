"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { FormEvent, useState } from "react";

const BookEvent = ({ eventId }: { eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { success, error: bookingError } = await createBooking({ eventId, email });

      if (success) {
        setSubmitted(true);
      } else {
        setError(
          typeof bookingError === "string"
            ? bookingError
            : "Booking failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id="book-event" className="flex flex-col items-center gap-3 py-4 text-center">
        <div className="text-4xl">🎉</div>
        <p className="font-semibold text-primary">You&apos;re in!</p>
        <p className="text-sm text-light-200">
          Confirmation sent to <span className="text-foreground">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <div id="book-event">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>
        {error && (
          <p className="text-sm" style={{ color: "var(--destructive)" }}>
            {error}
          </p>
        )}
        <button className="button-submit" type="submit" disabled={loading}>
          {loading ? "Booking…" : "Book My Spot"}
        </button>
      </form>
    </div>
  );
};

export default BookEvent;
