/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
  moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1", 
      "\\.(css|scss|sass)$": "identity-obj-proxy", 
    },
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest"],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!jose|openid-client)/"
  ],
};
