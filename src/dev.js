#!/usr/bin/env node
// @ts-check
const { spawnSync } = require(`child_process`);
const path = require(`path`);
const fs = require(`fs`);

const localModules = resolveNodeModulesPath();
const cwd = process.cwd();
const argv = process.argv.slice(2);
const command = argv.shift();

if (command.startsWith(`test`)) {
  ensureJestConfig(cwd);
  exec(`jest`, [argv.shift() || `.`, ...(command === `test:watch` ? [`--watch`] : [])]);
}

if (command === `tsnode`) {
  exec(`ts-node`, argv);
}

if (command.startsWith(`lint`)) {
  exec(`eslint`, [
    `--config`,
    `${__dirname}/../.eslintrc.js`,
    `--ignore-pattern`,
    `**/dist/**`,
    `--ignore-pattern`,
    `**/public/**`,
    `--ignore-pattern`,
    `**/build/**`,
    `**/*.{ts,tsx,js}`,
    ...(command === `lint:fix` ? [`--fix`] : []),
  ]);
}

if (command.startsWith(`format`)) {
  exec(`prettier`, [
    `--config`,
    `${__dirname}/../.prettierrc.json`,
    `--ignore-path`,
    prettierIgnorePath(),
    `**/*.{ts,tsx,js,css,yml}`,
    argv.includes(`--check`) ? `--check` : `--write`,
  ]);
}

if (command === `ts:compile`) {
  exec(`tsc`, [...argv]);
}

if (command === `ts:check`) {
  exec(`tsc`, [`--noEmit`, `-p`, cwd]);
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
    `tsnode`,
  ].includes(command)
) {
  console.error(`\x1b[31mUnknown command: ${command}\x1b[0m`);
  process.exit(1);
}

/**
 *
 * @param {string} bin
 * @param {string[]} args
 * @returns {never}
 */
function exec(bin, args = []) {
  const { status } = spawnSync(`${localModules}/.bin/${bin}`, args, {
    stdio: `inherit`,
    cwd,
  });
  process.exit(status === null ? 1 : status);
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

/**
 * @returns {string}
 */
function prettierIgnorePath() {
  if (!fs.existsSync(`${cwd}/.prettierignore`)) {
    return `${cwd}/.gitignore`;
  }
  // merge the .gitignore and the .prettierignore
  const generated = `${__dirname}/../.generated.prettierignore`;
  const gitIgnore = fs.readFileSync(`${cwd}/.gitignore`, `utf8`);
  const prettierIgnore = fs.readFileSync(`${cwd}/.prettierignore`, `utf8`);
  fs.writeFileSync(generated, `${gitIgnore}\n${prettierIgnore}`);
  return generated;
}
