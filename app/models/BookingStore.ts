import { Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { BookingModel } from "./Booking"
import { auth, db, functions } from "../firebase/config";
import { collection, addDoc, } from "firebase/firestore";

/**
 * Model description here for TypeScript hints.
 */

// Define the BookingStore model
export const BookingStoreModel = types
  .model("BookingStore", {
    booking: BookingModel,
  })
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    // Define an action to update the booking object
    updateBooking(key, value) {
      self.booking[key] = value;
      // Update the price based on some logic
      // For example, if vehicle type is Bus, reduce price by 10%
      if (key === "vehicleType" && value === "Bus") {
        self.booking.price = self.booking.price * 0.9;
      }
    },
    // Define an action to save the booking object to Firestore
    async saveBooking() {
      try {
        // Get a reference to the bookings collection using db instead of firestore
        const bookingsRef = collection(db, "bookings");
        // Add a new document with the booking object
        await addDoc(bookingsRef, self.booking);
        // Return true if successful
        return true;
      } catch (error) {
        // Return false if failed
        return false;
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

// Create an instance of the store
export const bookingStore = BookingStoreModel.create();

export interface BookingStore extends Instance<typeof BookingStoreModel> { }
export interface BookingStoreSnapshotOut extends SnapshotOut<typeof BookingStoreModel> { }
export interface BookingStoreSnapshotIn extends SnapshotIn<typeof BookingStoreModel> { }
export const createBookingStoreDefaultModel = () => types.optional(BookingStoreModel, {})

