import * as bcrypt from "bcryptjs";

export class Encrypt {
  async cryptString(str: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(str, salt);
  }

  async compareString(str: string, strEncrypted: string): Promise<boolean> {
    return bcrypt.compare(str, strEncrypted);
  }
}
