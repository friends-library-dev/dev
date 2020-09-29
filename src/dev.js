#!/usr/bin/env node
// @ts-check
const { spawnSync } = require(`child_process`);
const path = require(`path`);
const fs = require(`fs`);

const localModules = resolveNodeModulesPath();
const cwd = process.cwd();
const args = process.argv.slice(2);
const script = args.shift();

if (script.startsWith(`test`)) {
  ensureJestConfig(cwd);
  const nodeArgs = [
    `${localModules}/.bin/jest`,
    args.shift() || `.`,
    ...(script === `test:watch` ? [`--watch`] : []),
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (script.startsWith(`lint`)) {
  const nodeArgs = [
    `${localModules}/.bin/eslint`,
    `--config`,
    `${__dirname}/../.eslintrc.js`,
    `**/*.{ts,tsx,js}`,
    ...(script === `lint:fix` ? [`--fix`] : []),
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (script.startsWith(`format`)) {
  const nodeArgs = [
    `${localModules}/.bin/prettier`,
    `--config`,
    `${__dirname}/../.prettierrc.json`,
    `**/*.{ts,tsx,js,css,yml}`,
    args.includes(`--check`) ? `--check` : `--write`,
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (script === `ts:check`) {
  spawnSync(`${localModules}/.bin/tsc`, [`--noEmit`, `-p`, cwd], {
    stdio: `inherit`,
    cwd,
  });
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
