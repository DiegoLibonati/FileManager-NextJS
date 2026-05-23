import { hash, verify } from "@node-rs/bcrypt";

export class Encrypt {
  async cryptString(str: string): Promise<string> {
    return hash(str, 10);
  }

  async compareString(str: string, strEncrypted: string): Promise<boolean> {
    return verify(str, strEncrypted);
  }
}
