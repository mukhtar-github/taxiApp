import { Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"
import { makeAutoObservable } from "mobx"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from "./User"

/**
 * Model description here for TypeScript hints.
 */

export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    User: types.optional(UserModel, {
      id: 1,
      name: "Test User",
      email: "test@test.com",
      age: 25,
      gender: "male",
      hobbies: ["coding", "reading", "gaming"],
      friends: [],
    }),
  })
  .props({
    // Use User model for profile
    profile: types.maybe(UserModel),
    token: types.maybe(types.string),
    error: types.maybe(types.string),
    loading: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    // Define the isAuthenticated view
    get isAuthenticated() {
      return !!self.token
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    // Modify login action to use mock data for testing
    login: flow(function* (username: string, password: string) {
      self.error = undefined
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
     // Modify register action to accept email as a parameter and use it for validation and testing
    register: flow(function* (mobileNumber: string, userName: string, password: string, email: string) {
      self.error = undefined
      self.loading = true
      try {
        // Use mock mobile number, user name, password and email for validation
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
          throw new Error("Invalid mobile number, user name, password or email")
        }
      } catch (error) {
        self.error = error.message
      } finally {
        self.loading = false
      }
    }),
    // Modify logout action to clear profile
    logout() {
      self.token = undefined
      self.profile = undefined
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotOut extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotIn extends SnapshotIn<typeof AuthenticationStoreModel> {}
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
