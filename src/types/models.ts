export interface IUser {
  _id: string;
  username: string;
  email: string;
  plan: string;
  emailVerified: boolean;
}

export interface IRecentFile {
  _id: string;
  filename: string;
  extension: string;
  path: string;
  size: number;
  uploader: string;
  idCategory: string;
  bgColor: string;
  color: string;
  type: string;
}
