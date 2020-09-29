#!/usr/bin/env node
// @ts-check
const { spawnSync } = require(`child_process`);
const path = require(`path`);
const fs = require(`fs`);

const NODE_MODULES = path.resolve(__dirname, `..`, `node_modules`);

process.on(`unhandledRejection`, (err) => {
  throw err;
});

const args = process.argv.slice(2);
const script = args.shift();

if (script.startsWith(`test`)) {
  const cwd = process.cwd();
  ensureJestConfig(cwd);
  const nodeArgs = [
    `${NODE_MODULES}/.bin/jest`,
    args.shift() || `.`,
    ...(script === `test:watch` ? [`--watch`] : []),
  ];
  spawnSync(process.execPath, nodeArgs, { stdio: 'inherit', cwd });
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
