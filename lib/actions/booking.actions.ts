"use server";

import Booking from "@/app/database/booking.model";
import connectDB from "../mongodb";

export const createBooking = async ({eventId, email, slug}: {eventId: string, email: string, slug: string}) => {
    try {
        await connectDB();
        await Booking.create({eventId, slug, email});
        return { success: true };
    } catch (error) {
        console.error('Error creating booking:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}