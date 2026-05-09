import type { UserPublicData } from "@/types/cross";

import { UserDAO } from "@/server/daos/user.dao";

import { serializeUser } from "@/server/helpers/serialize.helper";
import { Encrypt } from "@/server/helpers/encrypt.helper";

import { getEnvs } from "@/server/configs/env.config";
import { Email } from "@/server/configs/email.config";

export const UserService = {
  async getUserInfo(username: string): Promise<UserPublicData | null> {
    const user = await UserDAO.findByUsername(username);
    return user ? serializeUser(user) : null;
  },

  async changePlan(username: string, plan: string): Promise<UserPublicData | null> {
    const user = await UserDAO.findByUsername(username);
    if (!user) return null;

    await UserDAO.updateById(user._id.toString(), { plan });
    const updated = await UserDAO.findByUsername(username);
    return updated ? serializeUser(updated) : null;
  },

  async sendVerificationEmail(username: string): Promise<{ success: true } | { error: string }> {
    const user = await UserDAO.findByUsername(username);
    if (!user) return { error: "User not found." };

    const encrypt = new Encrypt();
    const hashedId = await encrypt.cryptString(user._id.toString());
    const { NEXT_PUBLIC_API_URL } = getEnvs();

    await new Email().sendEmail(
      user.email,
      "You can now verify your email in Nexdrive.",
      `Enter the following link to verify your email address: ${NEXT_PUBLIC_API_URL}/api/v1/auth/verify?id=${hashedId}&username=${user.username}`
    );

    return { success: true };
  },
};
