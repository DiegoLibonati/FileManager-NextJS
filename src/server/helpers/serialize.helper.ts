import type { IUserDoc } from "@/types/api";
import type { IUser } from "@/types/models";

export const serializeUser = (doc: IUserDoc): IUser => ({
  _id: String(doc._id),
  username: doc.username,
  email: doc.email,
  plan: doc.plan,
  emailVerified: doc.emailVerified,
});
