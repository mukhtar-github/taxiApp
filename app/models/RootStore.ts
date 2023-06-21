import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookingStoreModel } from "./BookingStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { UserModel } from "./User"
import { EpisodeStoreModel } from "./EpisodeStore" // @demo remove-current-line

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  bookingStore: types.optional(BookingStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  User: types.optional(UserModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}), // @demo remove-current-line
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
