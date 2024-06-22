import * as bcrypt from "bcryptjs";

export class Encrpyt {
  constructor(public password: string, public hashPassword: string = "") {}

  async cryptPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    this.hashPassword = await bcrypt.hash(this.password, salt);
    return this.hashPassword;
  }

  async comparePassword(): Promise<boolean> {
    const compare = await bcrypt.compare(this.password, this.hashPassword);
    return compare;
  }
}
