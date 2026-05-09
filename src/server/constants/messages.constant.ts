import type { MessagesSuccess, MessagesNot, MessagesError, MessagesValidation } from "@/types/api";

export const MESSAGES_SUCCESS: MessagesSuccess = {
  login: "User successfully logged in!",
  logout: "You sign out it successfully",
  register: "User successfully created!",
  resetPassword: "Your password has been successfully reset!.",
  sendEmailReset: "Password reset email sent successfully!.",
  getDirectory: "Files and directories sent successfully!.",
  createFolder: "Directory successfully created!.",
  deleteFolder: "Folder successfully deleted!.",
  deleteFile: "File successfully deleted!.",
  upload: "File successfully uploaded!.",
  getCategories: "Categories sent successfully!.",
  getCategoryFiles: "Recent upload sent successfully!.",
  getFolders: "All directories sent successfully!.",
  getRecentUpload: "Recent upload sent successfully!.",
  changePlan: "Plan successfully changed!.",
  sendVerificationEmail: "Verification email sent successfully!.",
  getUserInfo: "User information successfully delivered!.",
};

export const MESSAGES_NOT: MessagesNot = {
  validId: "A valid ID is required.",
};

export const MESSAGES_ERROR: MessagesError = {
  generic: "Something went wrong.",
  unauthorized: "Unauthorized.",
  invalidCredentials: "Invalid credentials.",
  notFound: "Not found.",
};

export const MESSAGES_VALIDATION: MessagesValidation = {
  login: "A username and password are required to log in to an account.",
  register: "A username, password and email are required to create an account.",
  verify: "Id and username are required.",
  resetPassword: "Id, username and password are required.",
  sendEmailReset: "Email is required.",
  plan: "Plan is required.",
  path: "Path is required.",
  pathAndType: "Path and type are required.",
  pathAndFile: "Path and file are required.",
  categoryName: "Category name is required.",
};
