#!/usr/bin/env node
// @ts-check
const { spawnSync } = require(`child_process`);
const path = require(`path`);
const fs = require(`fs`);

const localModules = resolveNodeModulesPath();
const cwd = process.cwd();
const args = process.argv.slice(2);
const command = args.shift();

if (command.startsWith(`test`)) {
  ensureJestConfig(cwd);
  const nodeArgs = [
    `${localModules}/.bin/jest`,
    args.shift() || `.`,
    ...(command === `test:watch` ? [`--watch`] : []),
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (command.startsWith(`lint`)) {
  const nodeArgs = [
    `${localModules}/.bin/eslint`,
    `--config`,
    `${__dirname}/../.eslintrc.js`,
    `**/*.{ts,tsx,js}`,
    ...(command === `lint:fix` ? [`--fix`] : []),
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (command.startsWith(`format`)) {
  const nodeArgs = [
    `${localModules}/.bin/prettier`,
    `--config`,
    `${__dirname}/../.prettierrc.json`,
    `**/*.{ts,tsx,js,css,yml}`,
    args.includes(`--check`) ? `--check` : `--write`,
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (command === `ts:compile`) {
  spawnSync(`${localModules}/.bin/tsc`, [...args], { stdio: `inherit`, cwd });
}

if (command === `ts:check`) {
  spawnSync(`${localModules}/.bin/tsc`, [`--noEmit`, `-p`, cwd], {
    stdio: `inherit`,
    cwd,
  });
}

if (
  ![
    `ts:check`,
    `ts:compile`,
    `test`,
    `test:watch`,
    `lint`,
    `lint:fix`,
    `format`,
  ].includes(command)
) {
  console.error(`\x1b[31mUnknown command: ${command}\x1b[0m`);
  process.exit(1);
}

/**
 * @param {string} cwd
 * @returns {void}
 */
function ensureJestConfig(cwd) {
  const destPath = `${cwd}/jest.config.js`;
  if (fs.existsSync(destPath)) {
    return;
  }
  const config = fs.readFileSync(`${__dirname}/jest.config.js`, `utf8`);
  fs.writeFileSync(
    destPath,
    `// auto-generated, do not edit\n${config.replace(
      `<abs-path-to-ts-jest>`,
      `${localModules}/ts-jest/dist/`,
    )}`,
  );
}

/**
 * @returns {string}
 */
function resolveNodeModulesPath() {
  let nmPath = path.resolve(__dirname, `..`, `..`, `..`);
  // happy path, this is installed as a normal npm module
  if (nmPath.endsWith(`node_modules`)) {
    return nmPath;
  }
  // this takes over if we're `npm link`-ed during dev
  return path.resolve(__dirname, `..`, `node_modules`);
}
