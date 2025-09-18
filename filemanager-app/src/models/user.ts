import { model, models, Schema } from "mongoose";

import { IUser } from "@src/app/lib/entities";

const UserSchema = new Schema<IUser>(
  {
    username: String,
    email: String,
    password: String,
    plan: String,
    emailVerified: Boolean,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        const { _id, ...rest } = ret;
        return rest;
      },
    },
  }
);

const User = models.User || model("User", UserSchema);
export default User;
