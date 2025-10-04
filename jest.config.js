/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }]
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!jose|openid-client)/"
  ],
};
