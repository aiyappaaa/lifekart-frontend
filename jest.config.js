// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEach: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { 
    '^@/(.*)$': '<rootDir>/src/$1' 
  },
  coverageThreshold: {
    global: { 
      branches: 75, 
      functions: 75, 
      lines: 75, 
      statements: 75 
    },
  },
};

module.exports = createJestConfig(customJestConfig);