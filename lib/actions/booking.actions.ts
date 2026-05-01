"use server";

import Booking from "@/app/database/booking.model";
import Event from "@/app/database/event.model";
import connectDB from "../mongodb";

export const createBooking = async ({ eventId, email }: { eventId: string; email: string }) => {
  try {
    await connectDB();
    await Booking.create({ eventId, email });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      // Duplicate booking
      if (error.message.includes('duplicate key') || (error as { code?: number }).code === 11000) {
        return { success: false, error: "You've already booked a spot for this event." };
      }
      return { success: false, error: error.message };
    }
    return { success: false, error: "Booking failed. Please try again." };
  }
};

export const getBookingCount = async (slug: string): Promise<number> => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).select("_id").lean();
    if (!event) return 0;
    return await Booking.countDocuments({ eventId: (event as { _id: unknown })._id });
  } catch {
    return 0;
  }
};