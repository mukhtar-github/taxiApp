import { BookingStoreModel } from "./BookingStore"

test("can be created", () => {
  const instance = BookingStoreModel.create({})

  expect(instance).toBeTruthy()
})
