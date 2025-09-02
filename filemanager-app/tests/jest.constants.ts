// MOCKS MODULES
export const mockUseAlertStore = {
  alert: {
    message: "",
    open: false,
    type: "info",
  },
  handleSetAlert: jest.fn(),
};

export const mockUseUserStore = {
  user: { username: "", emailVerified: false },
  handleSetUser: jest.fn(),
};

// MOCKS LIBS
export const mockUseRouter = {
  push: jest.fn(),
  refresh: jest.fn(),
};
export const mockUsePathname = "/some/path";
export const mockUseSearchParams = {
  get: jest.fn(),
};

// AXIOS

// Axios User

export const mockResponseSendEmailToVerify = {
  message: "Verification email sent successfully!.",
};
export const mockResponseChangePlan = {
  data: {
    username: "pepe",
    email: "pepe@gmail.com",
    plan: "1",
    emailVerified: false,
  },
  message: "Plan successfully changed!.",
};

// Axios FileManager

export const mockResponseFilemanagerDelete = {
  message: "File successfully deleted!.",
};
export const mockResponseFilemanagerCreateFolder = {
  message: "Directory successfully created!.",
};
export const mockResponseFilemanagerUpload = {
  data: {
    filename: "pepe.py",
    extension: ".py",
    path: "/pathcito",
    size: 2,
    uploader: "pepea",
    idCategory: "music",
    bgColor: "#000",
    color: "#fff",
    type: "file",
  },
  message: "File successfully uploaded!.",
};
export const mockResponseFileManagerGetCategoryFiles = {
  data: [
    {
      id: "123",
      bgColor: "#fff",
      color: "#000",
      idCategory: "music",
      filename: "namecito",
      size: "5",
      path: "/paer/123",
      type: "file",
      extension: ".py",
    },
  ],
  message: "Recent upload sent successfully!.",
};

// Axios Auth

export const mockResponseAuthLogout = {
  message: "You sign out it successfully",
};
export const mockResponseAuthLogin = {
  data: {
    username: "pepe",
    email: "pepe@gmail.com",
    plan: "1",
    emailVerified: false,
  },
  message: "User successfully logged in!",
};
export const mockResponseAuthRegister = {
  data: {
    username: "pepe",
    email: "pepe@gmail.com",
    plan: "1",
    emailVerified: false,
  },
  message: "User successfully created!",
};
export const mockResponseAuthReset = {
  message: "Your password has been successfully reset!.",
};
export const mockResponseAuthSendEmailReset = {
  message: "Password reset email sent successfully!.",
};
