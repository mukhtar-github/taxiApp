import { Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from "./User"
// import { makeAutoObservable } from "mobx"

export const AuthenticationStoreModel = types
 .model("AuthenticationStore", {
  profile: types.maybe(UserModel), // Use `types.maybe` to allow null or undefined
  token: types.maybe(types.string), // Use `types.maybe` to allow null or undefined
  error: types.maybe(types.string), // Use `types.maybe` to allow null or undefined
  loading: types.optional(types.boolean, false),

//     profile: types.maybe(UserModel),
//  token: types.maybe(null), // Use types.maybe(null) instead of null
//  error: types.maybe(null), // Use types.maybe(null) instead of null
//  loading: types.optional(types.boolean, false),

//  person: types.optional(PersonData, { 
//   id: null;
//   email: null;
//   firs_name: null;
//   last_name: null;
// })

 // profile: types.maybe(UserModel),
 // token: types.maybe(types.string),
 // error: types.maybe(types.string),
 // loading: types.optional(types.boolean, false),

 })
 .props({
 // Additional properties for the store
 })
 .actions(withSetPropAction)
 .views((self) => ({
 // Define the isAuthenticated view
 get isAuthenticated() {
 return !!self.token
 },
 }))
 .actions((self) => {
 return {
 // Modify register action to accept email as a parameter and use it for validation and testing
 register: flow(function* (mobileNumber: string, userName: string, password: string, email: string) {
 self.error = ""
 self.loading = true
 try {
 // Use mock mobile number, user name, password, and email for validation
 if (mobileNumber === "1234567890" && userName === "test" && password === "test" && email === "test@test.com") {
 // Use mock token and profile for testing
 self.token = "mock-token"
 self.profile = UserModel.create({
 id: 1,
 name: "Test User",
 email: "test@test.com",
 age: 25,
 gender: "male",
 hobbies: ["coding", "reading", "gaming"],
 friends: [],
 })
 } else {
 throw new Error("Invalid mobile number, user name, password, or email")
 }
 } catch (error) {
 self.error = error.message
 } finally {
 self.loading = false
 }
 }),
 // Rest of the actions...
 // Modify login action to use mock data for testing
 login: flow(function* (username: string, password: string) {
 self.error = ""
 self.loading = true
 try {
 // Use mock username and password for validation
 if (username === "test" && password === "test") {
 // Use mock token and profile for testing
 self.token = "mock-token"
 self.profile = UserModel.create({
 id: 1,
 name: "Test User",
 email: "test@test.com",
 age: 25,
 gender: "male",
 hobbies: ["coding", "reading", "gaming"],
 friends: [],
 })
 } else {
 throw new Error("Invalid username or password")
 }
 } catch (error) {
 self.error = error.message
 } finally {
 self.loading = false
 }
 }),
 // Modify logout action to clear profile
 logout() {
 self.token = ""
 self.profile = UserModel.create({
 id: 0,
 name: "",
 email: "",
 mobileNumber: "",
 age: 0,
 gender: "",
 hobbies: [],
 friends: [],
 })
 },
 }
 })

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotOut extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotIn extends SnapshotIn<typeof AuthenticationStoreModel> {}
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
