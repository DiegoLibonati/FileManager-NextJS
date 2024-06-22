import { model, models, Schema } from "mongoose";
import { IUser } from "@/app/lib/entities";

const UserSchema = new Schema<IUser>(
  {
    username: String,
    email: String,
    password: String,
    plan: String,
    emailVerified: Boolean
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);

const User = models.User || model("User", UserSchema);
export default User;
