import { BookingModel } from "./Booking"

test("can be created", () => {
  const instance = BookingModel.create({})

  expect(instance).toBeTruthy()
})
