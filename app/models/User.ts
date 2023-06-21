import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User", {
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    email: types.maybe(types.string),
    password: types.maybe(types.string),
    mobileNumber: types.maybe(types.number),
    avatar: types.maybe(types.string),
    age: types.maybe(types.number),
    gender: types.maybe(types.string),
    hobbies: types.array(types.string),
    friends: types.array(types.string),
  })
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> { }
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> { }
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> { }
export const createUserDefaultModel = () => types.optional(UserModel, {
  id: 0,
  name: "",
  email: "",
  password: "",
  mobileNumber: 0,
  age: 0,
  gender: "",
  hobbies: [],
  friends: [],
})
