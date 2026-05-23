import type { IUserDoc } from "@/types/api";
import type { IUser } from "@/types/models";

import { idToString } from "@/server/helpers/id_to_string.helper";

export const serializeUser = (doc: IUserDoc): IUser => ({
  _id: idToString(doc._id),
  username: doc.username,
  email: doc.email,
  plan: doc.plan,
  emailVerified: doc.emailVerified,
});
