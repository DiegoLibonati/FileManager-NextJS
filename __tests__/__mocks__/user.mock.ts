export const mockUser = {
  _id: "507f1f77bcf86cd799439011",
  username: "alice",
  email: "alice@example.com",
  plan: "0",
  emailVerified: false,
};

export const mockUserDoc = {
  _id: { toString: (): string => "507f1f77bcf86cd799439011" },
  username: "alice",
  email: "alice@example.com",
  plan: "0",
  emailVerified: false,
  password: "$2b$10$hashedpassword",
};
