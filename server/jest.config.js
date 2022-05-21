export default {
    rootDir: ".",
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm',
    globals: {
      'ts-jest': {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig-server.json'
      },
    },
    //moduleDirectories: ["node_modules"],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },

    //testRegex: '(server/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    testRegex: '/__tests__/.*\\.ts$',
    coverageDirectory: 'server-dist/coverage',
    collectCoverageFrom: [
      'server/src/**/*.ts',
      '!server/src/**/*.d.ts',
    ],
  };