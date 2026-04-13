module.exports = {
  preset: 'jest-preset-angular',

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  testEnvironment: 'jsdom',

    transform: {
    '^.+\\.(ts|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'html', 'js'],

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
  ],
};