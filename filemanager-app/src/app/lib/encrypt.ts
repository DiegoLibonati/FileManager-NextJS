import * as bcrypt from "bcryptjs";

export class Encrpyt {
  constructor() {}

  async cryptString(str: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const strEncrypted = await bcrypt.hash(str, salt);
    return strEncrypted;
  }

  async compareString(str: string, strEncrypted: string): Promise<boolean> {
    const compare = await bcrypt.compare(str, strEncrypted);
    return compare;
  }
}
