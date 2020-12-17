# @friends-library/dev

Meta-package for convenient development. Sort of like `react-scripts` for all-purpose
typescript module development. Includes pre-configured out-of-the-box support for:

- TypeScript (currently `4.1.x`)
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
