import { Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";
import { UserModel } from "./User";
import { register, login, logout, getCurrentUserDocument } from "../firebase/config";
// import { makeAutoObservable } from "mobx"

export const AuthenticationStoreModel = types.model("AuthenticationStore", {
  profile: types.maybe(UserModel), // Use types.maybe to allow null or undefined
  token: types.maybe(types.string), // Use types.maybe to allow null or undefined
  error: types.maybe(types.string), // Use types.maybe to allow null or undefined
  loading: types.optional(types.boolean, false),
  password: types.maybe(types.string),
})
  .props({
    //Additional properties for the store
  })
  .actions(withSetPropAction)
  .views((self) => ({
    // Define the isAuthenticated view
    get isAuthenticated() {
      return !!self.token;
    },
  }))
  .actions((self) => {
    return {
      // Modify register action to use Firebase service
      register: flow(function* (name: string, email: string, password: string) {
        self.error = "";
        self.loading = true;
        try {
          // Register a new user with Firebase
          const user = yield register(email, password);
          // Get the user document from Firestore
          const profile = yield getCurrentUserDocument();
          // Set the token and profile in the store
          self.token = user.uid;
          self.profile = UserModel.create(profile);
        } catch (error) {
          self.error = error.message;
        } finally {
          self.loading = false;
        }
      }),
      // Modify login action to use Firebase service
      login: flow(function* (email: string, password: string) {
        self.error = "";
        self.loading = true;
        try {
          // Sign in the user with Firebase
          const user = yield login(email, password);
          // Get the user document from Firestore
          const profile = yield getCurrentUserDocument();
          // Set the token and profile in the store
          self.token = user.uid;
          self.profile = UserModel.create(profile);
        } catch (error) {
          self.error = error.message;
        } finally {
          self.loading = false;
        }
      }),
      // Modify logout action to use Firebase service
      logout: flow(function* () {
        try {
          // Sign out the current user with Firebase
          yield logout();
          // Clear the token and profile in the store
          self.token = "";
          self.profile = UserModel.create({
            id: 0,
            name: "",
            email: "",
            mobileNumber: 0,
            avatar: "",
            age: 0,
            gender: "",
            hobbies: [],
            friends: [],
          });
        } catch (error) {
          self.error = error.message;
        }
      }),
    };
  });

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshotOut extends SnapshotOut<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshotIn extends SnapshotIn<typeof AuthenticationStoreModel> { }
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {});
