import { UserModel } from "./User"

test("can be created", () => {
  const instance = UserModel.create({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    mobileNumber: "1234567890",
    age: 30,
    gender: "male",
  })

  expect(instance).toBeTruthy()
})
