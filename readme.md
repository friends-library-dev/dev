# @friends-library/dev

Meta-package for convenient development. Sort of like `react-scripts` for all-purpose
typescript module development. Includes pre-configured out-of-the-box support for:

- TypeScript (currently `4.5.x`)
- Jest (setup with ts-jest)
- eslint (configured for typescript with opinionated defaults)
- prettier
- ts-node

Exposes a `fldev` bin that can be used with `npx` or as part of npm _scripts_:

```bash
# run the tsc compile checker, without emitting compiled files
$ npx fldev ts:check

# compile typescript according to tsconfig.json settings
$ npx fldev ts:compile

# run jest tests
$ npx fldev test

# run jest tests in "watch" mode
$ npx fldev test:watch

# run eslint
$ npx fldev lint

# run eslint, fixing fixable errors
$ npx fldev lint:fix

# run prettier (--write)
$ npx fldev format

# execute something with ts-node
$ npx fldev tsnode ./some-ts-script.ts

# run `ts:check`, `test`, `lint`, and `format --check`
$ npx fldev ci
```

These scripts are often useful embedded in npm scripts in your `package.json`, like so:

```json
{
  "scripts": {
    "test": "fldev test",
    "test:watch": "fldev test:watch",
    "lint": "fldev lint",
    "lint:fix": "fldev lint:fix",
    "ts:check": "fldev ts:check",
    "format": "fldev format",
    "compile": "fldev ts:compile"
  }
}
```

⚠️ _NOTE:_ This package **does not follow semver.** Instead, it's minor versions track
with Typescript releases, so `4.5.x` in this library would include `typescript` in the
`4.5.x` range. For that reason, it is recommend you install it pinning to an exact, or to
a minor version, like : `"@friends-library/dev": "~4.5.0"`.
