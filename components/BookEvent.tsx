"use client";

import { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
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
          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
