import type { UserPublicData } from "@/types/cross";

import { UserDAO } from "@/server/daos/user.dao";

import { serializeUser } from "@/server/helpers/serialize.helper";
import { Encrypt } from "@/server/helpers/encrypt.helper";
import { FileManager } from "@/server/helpers/file_manager.helper";

import { getEnvs } from "@/server/configs/env.config";
import { Email } from "@/server/configs/email.config";

interface Ok<T> {
  data: T;
  error?: never;
}
interface Err {
  error: string;
  data?: never;
}
type Result<T> = Ok<T> | Err;

export const AuthService = {
  async validateLogin(username: string, password: string): Promise<Result<UserPublicData>> {
    const user = await UserDAO.findByUsername(username);
    if (!user) return { error: `There is no account with the username: ${username}.` };

    const encrypt = new Encrypt();
    const match = await encrypt.compareString(password, user.password);
    if (!match) return { error: "Incorrect password." };

    return { data: serializeUser(user) };
  },

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<Result<UserPublicData>> {
    const exists = await UserDAO.findByEmailOrUsername(email, username);
    if (exists) {
      return {
        error: `An account already exists with this username: ${username} or this email: ${email}.`,
      };
    }

    const { CLOUD_PATH, NEXT_PUBLIC_API_URL } = getEnvs();
    await new FileManager(`${CLOUD_PATH}/${username}`).createFolder();

    const encrypt = new Encrypt();
    const passwordHashed = await encrypt.cryptString(password);
    const user = await UserDAO.create({
      username,
      email,
      password: passwordHashed,
      plan: "0",
      emailVerified: false,
    });

    const hashedId = await encrypt.cryptString(user._id.toString());
    await new Email().sendEmail(
      user.email,
      "Welcome to Nexdrive, it's a pleasure to have you with us.",
      `Enter the following link to verify your email address: ${NEXT_PUBLIC_API_URL}/api/v1/auth/verify?id=${hashedId}&username=${user.username}`
    );

    return { data: serializeUser(user) };
  },

  async verifyEmail(username: string, hashedId: string): Promise<Result<{ redirectUrl: string }>> {
    const user = await UserDAO.findByUsername(username);
    if (!user) return { error: "This account does not have an email to verify." };

    const encrypt = new Encrypt();
    const valid = await encrypt.compareString(user._id.toString(), hashedId);
    if (!valid) return { error: "Invalid email validation link." };

    await UserDAO.updateById(user._id.toString(), { emailVerified: true });
    return { data: { redirectUrl: `${getEnvs().NEXT_PUBLIC_API_URL}/login` } };
  },

  async resetPassword(username: string, hashedId: string, password: string): Promise<Result<true>> {
    const user = await UserDAO.findByUsername(username);
    if (!user) return { error: "This account does not have an email to verify." };

    const encrypt = new Encrypt();
    const valid = await encrypt.compareString(user._id.toString(), hashedId);
    if (!valid) return { error: "Invalid reset password link." };

    const newPasswordHashed = await encrypt.cryptString(password);
    await UserDAO.updateById(user._id.toString(), { password: newPasswordHashed });
    return { data: true };
  },

  async sendEmailReset(email: string): Promise<Result<true>> {
    const user = await UserDAO.findByEmail(email);
    if (!user) return { error: `There is no email: ${email} registered` };

    const encrypt = new Encrypt();
    const hashedId = await encrypt.cryptString(user._id.toString());
    const { NEXT_PUBLIC_API_URL } = getEnvs();

    await new Email().sendEmail(
      email,
      "You can now change your password in Nexdrive.",
      `Enter the following link to reset your password: ${NEXT_PUBLIC_API_URL}/new?id=${hashedId}&username=${user.username}`
    );

    return { data: true };
  },
};
