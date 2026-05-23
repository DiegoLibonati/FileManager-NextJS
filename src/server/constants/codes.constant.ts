import type { CodesSuccess, CodesNot, CodesError } from "@/types/api";

export const CODES_SUCCESS: CodesSuccess = {
  login: "SUCCESS_LOGIN",
  logout: "SUCCESS_LOGOUT",
  register: "SUCCESS_REGISTER",
  verify: "SUCCESS_VERIFY",
  resetPassword: "SUCCESS_RESET_PASSWORD",
  sendEmailReset: "SUCCESS_SEND_EMAIL_RESET",
  getDirectory: "SUCCESS_GET_DIRECTORY",
  createFolder: "SUCCESS_CREATE_FOLDER",
  deleteItem: "SUCCESS_DELETE_ITEM",
  upload: "SUCCESS_UPLOAD",
  getCategories: "SUCCESS_GET_CATEGORIES",
  getCategoryFiles: "SUCCESS_GET_CATEGORY_FILES",
  getFolders: "SUCCESS_GET_FOLDERS",
  getRecentUpload: "SUCCESS_GET_RECENT_UPLOAD",
  getSpaceUsed: "SUCCESS_GET_SPACE_USED",
  changePlan: "SUCCESS_CHANGE_PLAN",
  sendVerificationEmail: "SUCCESS_SEND_VERIFICATION_EMAIL",
  getUserInfo: "SUCCESS_GET_USER_INFO",
  healthLive: "SUCCESS_HEALTH_LIVE",
  healthReady: "SUCCESS_HEALTH_READY",
  alive: "SUCCESS_ALIVE",
};

export const CODES_NOT: CodesNot = {
  validId: "NOT_VALID_ID",
};

export const CODES_ERROR: CodesError = {
  generic: "ERROR_GENERIC",
  unauthorized: "ERROR_UNAUTHORIZED",
  forbidden: "ERROR_FORBIDDEN",
  rateLimit: "ERROR_RATE_LIMIT",
  invalidCredentials: "ERROR_INVALID_CREDENTIALS",
  notFound: "ERROR_NOT_FOUND",
  validation: "ERROR_VALIDATION",
  malformedBody: "ERROR_MALFORMED_BODY",
};
