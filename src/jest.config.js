module.exports = {
  transform: {
    '^.+\\.tsx?$': `<abs-path-to-ts-jest>`,
  },
  testEnvironment: `node`,
  testRegex: `__tests__/.*spec\\.ts$`,
  transformIgnorePatterns: [`node_modules/(?!(@friends-library)/)`],
};
