module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'dist/',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/components/index.ts'
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,tsx,jsx}', '!<rootDir>/src/**/*.stories.*'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  }
}
