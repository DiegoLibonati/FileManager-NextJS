/** @type {import('jest').Config} */

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  roots: ["<rootDir>/__tests__"],
  globalSetup: "<rootDir>/__tests__/jest.globalSetup.ts",
  globalTeardown: "<rootDir>/__tests__/jest.globalTeardown.ts",
  setupFiles: [
    "<rootDir>/__tests__/jest.polyfills.ts",
    "<rootDir>/__tests__/jest.polyfills-undici.ts",
    "<rootDir>/__tests__/jest.env.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__tests__/__mocks__/style.mock.ts",
    "\\.(png|jpg|jpeg|gif|svg|webp)$":
      "<rootDir>/__tests__/__mocks__/file.mock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/__tests__/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/types/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  maxWorkers: 1,
};

export default config;
