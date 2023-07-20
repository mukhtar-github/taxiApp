import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
// Define a route model with the predefined options and the price
export const BookingModel = types
  .model("Booking", {
    id: types.maybe(types.number),
    fromCity: types.maybe(types.string),
    fromLocation: types.maybe(types.string),
    toCity: types.maybe(types.string),
    toLocation: types.maybe(types.string),
    vehicleType: types.maybe(types.string),
    seatNumber: types.maybe(types.number),
    departureDate: types.maybe(types.string),
    departureTime: types.maybe(types.string),
    price: types.maybe(types.number)
  })
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Booking extends Instance<typeof BookingModel> { }
export interface BookingSnapshotOut extends SnapshotOut<typeof BookingModel> { }
export interface BookingSnapshotIn extends SnapshotIn<typeof BookingModel> { }
export const createBookingDefaultModel = () => types.optional(BookingModel, {
  id: 0,
  fromCity: "New York",
  fromLocation: "Times Square",
  toCity: "",
  toLocation: "",
  vehicleType: "",
  seatNumber: 0,
  departureDate: "",
  departureTime: "",
  price: 0,
})

