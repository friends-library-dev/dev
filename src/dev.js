#!/usr/bin/env node
// @ts-check
const { spawnSync } = require(`child_process`);
const path = require(`path`);
const fs = require(`fs`);

const NODE_MODULES = path.resolve(__dirname, `..`, `node_modules`);
const cwd = process.cwd();
const args = process.argv.slice(2);
const script = args.shift();

if (script.startsWith(`test`)) {
  ensureJestConfig(cwd);
  const nodeArgs = [
    `${NODE_MODULES}/.bin/jest`,
    args.shift() || `.`,
    ...(script === `test:watch` ? [`--watch`] : []),
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: 'inherit', cwd });
}

if (script.startsWith(`lint`)) {
  const nodeArgs = [
    `${NODE_MODULES}/.bin/eslint`,
    `--config`,
    `${__dirname}/../.eslintrc.js`,
    `**/*.{ts,tsx,js}`,
    ...(script === `lint:fix` ? [`--fix`] : []),
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (script.startsWith(`format`)) {
  const nodeArgs = [
    `${NODE_MODULES}/.bin/prettier`,
    `--config`,
    `${__dirname}/../.prettierrc.json`,
    `**/*.{ts,tsx,js,css,yml}`,
    args.includes(`--check`) ? `--check` : `--write`,
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: `inherit`, cwd });
}

if (script === `ts:check`) {
  spawnSync(`${NODE_MODULES}/.bin/tsc`, [`--noEmit`, `-p`, `.`], { stdio: `inherit` });
}

/**
 * @param {string} cwd
 * @returns void
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
      `${NODE_MODULES}/ts-jest/dist/`,
    )}`,
  );
}
