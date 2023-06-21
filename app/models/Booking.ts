import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
// Define a route model with the predefined options and the price
export const BookingModel = types
  .model("Booking", {
    id: types.identifier,
    fromCity: types.optional(types.string, "New York"),
    fromLocation: types.optional(types.string, "Times Square"),
    toCity: types.optional(types.string, "Boston"),
    toLocation: types.optional(types.string, "Harvard Square"),
    vehicleType: types.optional(types.string, "Car"),
    seatNumber: types.optional(types.number, 2),
    departureDate: types.optional(types.string, "2022-01-31"),
    departureTime: types.optional(types.string, "10:00 AM"),
    price: types.optional(types.number, 50), // Add price to the route object
  })
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Booking extends Instance<typeof BookingModel> { }
export interface BookingSnapshotOut extends SnapshotOut<typeof BookingModel> { }
export interface BookingSnapshotIn extends SnapshotIn<typeof BookingModel> { }
export const createBookingDefaultModel = () => types.optional(BookingModel, {})

