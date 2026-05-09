import type { HydratedDocument } from "mongoose";
import type { IUserDoc } from "@/types/api";
import type { UserCreatePayload } from "@/types/payloads";

import { connectDb } from "@/server/configs/mongo.config";

import { UserModel } from "@/server/models/user.model";

export const UserDAO = {
  async findByUsername(username: string): Promise<HydratedDocument<IUserDoc> | null> {
    await connectDb();
    return UserModel.findOne({ username });
  },

  async findByEmail(email: string): Promise<HydratedDocument<IUserDoc> | null> {
    await connectDb();
    return UserModel.findOne({ email });
  },

  async findByEmailOrUsername(
    email: string,
    username: string
  ): Promise<HydratedDocument<IUserDoc> | null> {
    await connectDb();
    return UserModel.findOne({ $or: [{ email }, { username }] });
  },

  async create(data: UserCreatePayload): Promise<HydratedDocument<IUserDoc>> {
    await connectDb();
    return UserModel.create(data);
  },

  async updateById(id: string, data: Record<string, unknown>): Promise<void> {
    await connectDb();
    await UserModel.updateOne({ _id: id }, data);
  },
};
