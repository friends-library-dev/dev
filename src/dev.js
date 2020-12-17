#!/usr/bin/env node
// @ts-check
const { spawnSync } = require(`child_process`);
const path = require(`path`);
const fs = require(`fs`);
const exec = require(`x-exec`).default;
const { red } = require(`x-chalk`);

const localModules = resolveNodeModulesPath();
const cwd = process.cwd();
const argv = process.argv.slice(2);
const command = argv.shift();

if (command.startsWith(`test`)) {
  ensureJestConfig(cwd);
  spawn(`jest`, [
    argv.shift() || `.`,
    ...(command === `test:watch` ? [`--watch`, `--runInBand`] : []),
  ]);
}

if (command === `tsnode`) {
  spawn(`ts-node`, [`--transpile-only`, ...argv]);
}

if (command.startsWith(`lint`)) {
  spawn(`eslint`, [
    `--config`,
    `${__dirname}/../.eslintrc.js`,
    ...argv,
    `**/*.{ts,tsx,js}`,
    ...(command === `lint:fix` ? [`--fix`] : []),
  ]);
}

if (command.startsWith(`format`)) {
  spawn(`prettier`, [
    `--config`,
    `${__dirname}/../.prettierrc.json`,
    `--ignore-path`,
    prettierIgnorePath(),
    `**/*.{ts,tsx,js,css,yml}`,
    argv.includes(`--check`) ? `--check` : `--write`,
  ]);
}

if (command === `ts:compile`) {
  spawn(`tsc`, [...argv]);
}

if (command === `ts:check`) {
  spawn(`tsc`, [`--noEmit`, `-p`, cwd]);
}

if (command === `ci`) {
  const cmds = [`lint`, `format -- --check`, `ts:check`, `test`];
  if (argv.includes(`--skip-test`) || argv.includes(`-t`)) {
    cmds.pop();
  }
  for (const cmd of cmds) {
    exec.out(`npm run ${cmd}`, cwd) || process.exit(1);
  }
  process.exit(0);
}

if (command === `publish`) {
  const type = argv.shift();
  const isMaster =
    exec.exit(`git rev-parse --symbolic-full-name --abbrev-ref HEAD`, cwd) === `master\n`;

  if (!isMaster) {
    red(`publish only allowed on <master>`);
    process.exit(1);
  }

  if (![`major`, `minor`, `patch`].includes(type)) {
    red(`Invalid version type [patch | minor | major]`);
    process.exit(1);
  }

  if (!exec.success(`git diff-index --quiet HEAD --`, cwd)) {
    red(`Git status not clean`);
    process.exit(1);
  }

  const ci = cwd === path.resolve(__dirname, `..`) ? `npm run ci` : `npx fldev ci`;
  if (!exec.out(ci, cwd)) {
    process.exit(1);
  }

  if (!exec.out(`npm version --git-tag-version=false ${type}`)) {
    process.exit(1);
  }

  if (!exec.out(`npm publish`)) {
    process.exit(1);
  }

  const newVersion = exec.exit(`jq -r .version package.json`, cwd).trim();
  exec.out(`git add .`, cwd);
  exec.out(`git commit -am v${newVersion}`);
  exec.out(`git tag v${newVersion}`);
  exec.out(`git push origin master`);
  exec.out(`git push origin tag v${newVersion}`);
}

if (
  ![
    `ci`,
    `publish`,
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
  red(`Unknown command: ${command}`);
  process.exit(1);
}

/**
 *
 * @param {string} bin
 * @param {string[]} args
 * @returns {never}
 */
function spawn(bin, args = []) {
  const binPath = `${localModules}/.bin/${bin}`;
  if (!fs.existsSync(binPath)) {
    red(`missing bin ${binPath} - maybe try \`npm install\`?`);
    process.exit(1);
  }

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
  const nmPath = path.resolve(__dirname, `..`, `..`, `..`);
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
