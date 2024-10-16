// jest.config.ts
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/projects/foundation/src/$1',
    '^app/(.*)$': '<rootDir>/projects/foundation/src/app/$1',
    '^assets/(.*)$': '<rootDir>/projects/foundation/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/projects/foundation/src/environments/$1',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  //snapshotSerializers,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/projects/foundation/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};

export default jestConfig;