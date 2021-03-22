module.exports = {
  parser: `@typescript-eslint/parser`,
  plugins: [
    `@typescript-eslint`,
    `no-only-tests`,
    `react`,
    `react-hooks`,
    `jsx-a11y`,
    `import`,
  ],
  extends: [`eslint:recommended`, `plugin:@typescript-eslint/recommended`, `prettier`],
  ignorePatterns: [
    `**/dist/*`,
    `**/public/*`,
    `**/.cache/*`,
    `**/storybook-static/*`,
    `**/build/*`,
  ],
  rules: {
    'no-var': `off`,
    'prefer-const': [`error`, { destructuring: `all` }],
    'default-case': `off`,
    'no-only-tests/no-only-tests': `error`,
    'no-useless-constructor': `off`,
    '@typescript-eslint/no-namespace': `off`,
    '@typescript-eslint/no-empty-function': `off`,
    '@typescript-eslint/ban-ts-comment': `off`,
    '@typescript-eslint/no-useless-constructor': `error`,
    '@typescript-eslint/no-explicit-any': `off`,
    '@typescript-eslint/no-this-alias': `off`,
    '@typescript-eslint/no-angle-bracket-type-assertion': `off`,
    '@typescript-eslint/no-use-before-define': `off`,
    '@typescript-eslint/explicit-module-boundary-types': [
      `error`,
      { allowArgumentsExplicitlyTypedAsAny: true },
    ],
    '@typescript-eslint/no-parameter-properties': `off`,
    '@typescript-eslint/no-unused-vars': [`error`, { argsIgnorePattern: `^_` }],
    'no-unused-vars': `off`,
    'no-undef': `off`,
    camelcase: `off`,
    '@typescript-eslint/quotes': [`error`, `backtick`],
    '@typescript-eslint/explicit-function-return-type': [
      `error`,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'no-unreachable-loop': `error`,
    'no-useless-backreference': `error`,
    'require-atomic-updates': `error`,

    // taken from eslint-config-react-app
    'array-callback-return': `error`,
    'dot-location': [`error`, `property`],
    eqeqeq: [`error`, `smart`],
    'new-parens': `error`,
    'no-array-constructor': `error`,
    'no-caller': `error`,
    'no-cond-assign': [`error`, `except-parens`],
    'no-const-assign': `error`,
    'no-control-regex': `error`,
    'no-delete-var': `error`,
    'no-dupe-args': `error`,
    'no-dupe-class-members': `error`,
    'no-dupe-keys': `error`,
    'no-duplicate-case': `error`,
    'no-empty-character-class': `error`,
    'no-empty-pattern': `error`,
    'no-eval': `error`,
    'no-ex-assign': `error`,
    'no-extend-native': `error`,
    'no-extra-bind': `error`,
    'no-extra-label': `error`,
    'no-fallthrough': `error`,
    'no-func-assign': `error`,
    'no-implied-eval': `error`,
    'no-invalid-regexp': `error`,
    'no-iterator': `error`,
    'no-label-var': `error`,
    'no-labels': [`error`, { allowLoop: true, allowSwitch: false }],
    'no-lone-blocks': `error`,
    'no-mixed-operators': [
      `error`,
      {
        groups: [
          [`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`],
          [`==`, `!=`, `===`, `!==`, `>`, `>=`, `<`, `<=`],
          [`&&`, `||`],
          [`in`, `instanceof`],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-multi-str': `error`,
    'no-native-reassign': `error`,
    'no-negated-in-lhs': `error`,
    'no-new-func': `error`,
    'no-new-object': `error`,
    'no-new-symbol': `error`,
    'no-new-wrappers': `error`,
    'no-obj-calls': `error`,
    'no-octal': `error`,
    'no-octal-escape': `error`,
    'no-regex-spaces': `error`,
    'no-restricted-syntax': [`error`, `WithStatement`],
    'no-script-url': `error`,
    'no-self-assign': `error`,
    'no-self-compare': `error`,
    'no-sequences': `error`,
    'no-shadow-restricted-names': `error`,
    'no-sparse-arrays': `error`,
    'no-template-curly-in-string': `error`,
    'no-this-before-super': `error`,
    'no-throw-literal': `error`,
    'no-unreachable': `error`,
    'no-unused-expressions': [
      `error`,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-labels': `error`,
    'no-useless-computed-key': `error`,
    'no-useless-concat': `error`,
    'no-useless-escape': `error`,
    'no-useless-rename': [
      `error`,
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    'no-with': `error`,
    'no-whitespace-before-property': `error`,
    'react-hooks/exhaustive-deps': `error`,
    'require-yield': `error`,
    'rest-spread-spacing': [`error`, `never`],
    strict: [`error`, `never`],
    'unicode-bom': [`error`, `never`],
    'use-isnan': `error`,
    'valid-typeof': `error`,
    'getter-return': `error`,

    // import
    'import/first': `error`,
    'import/no-amd': `error`,
    'import/no-webpack-loader-syntax': `error`,

    // react
    'react/forbid-foreign-prop-types': [`error`, { allowInPropTypes: true }],
    'react/jsx-no-comment-textnodes': `error`,
    'react/jsx-no-duplicate-props': `error`,
    'react/jsx-no-target-blank': `error`,
    'react/jsx-no-undef': `error`,
    'react/jsx-pascal-case': [
      `error`,
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/jsx-uses-react': `error`,
    'react/jsx-uses-vars': `error`,
    'react/no-danger-with-children': `error`,
    'react/no-deprecated': `error`,
    'react/no-direct-mutation-state': `error`,
    'react/no-is-mounted': `error`,
    'react/no-typos': `error`,
    'react/react-in-jsx-scope': `error`,
    'react/require-render-return': `error`,
    'react/style-prop-object': `error`,

    // react-hooks
    'react-hooks/rules-of-hooks': `error`,

    // react-jsx-a11y
    'jsx-a11y/accessible-emoji': `error`,
    'jsx-a11y/alt-text': `error`,
    'jsx-a11y/anchor-has-content': `error`,
    'jsx-a11y/anchor-is-valid': [
      `error`,
      {
        aspects: [`noHref`, `invalidHref`],
      },
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': `error`,
    'jsx-a11y/aria-props': `error`,
    'jsx-a11y/aria-proptypes': `error`,
    'jsx-a11y/aria-role': [`error`, { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': `error`,
    'jsx-a11y/heading-has-content': `error`,
    'jsx-a11y/iframe-has-title': `error`,
    'jsx-a11y/img-redundant-alt': `error`,
    'jsx-a11y/no-access-key': `error`,
    'jsx-a11y/no-distracting-elements': `error`,
    'jsx-a11y/no-redundant-roles': `error`,
    'jsx-a11y/role-has-required-aria-props': `error`,
    'jsx-a11y/role-supports-aria-props': `error`,
    'jsx-a11y/scope': `error`,
  },
  overrides: [
    {
      files: [`**/*.stories.tsx`],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': `off`,
        '@typescript-eslint/explicit-function-return-type': `off`,
      },
    },
    {
      files: [`*.js`],
      rules: {
        '@typescript-eslint/no-var-requires': `off`,
        '@typescript-eslint/explicit-module-boundary-types': `off`,
        '@typescript-eslint/explicit-function-return-type': `off`,
      },
    },
    {
      files: [`**/__tests__/**`],
      rules: {
        'no-throw-literal': `off`,
        '@typescript-eslint/no-non-null-assertion': `off`,
        '@typescript-eslint/consistent-type-assertions': `off`,
        '@typescript-eslint/explicit-function-return-type': `off`,
      },
    },
  ],
  settings: {
    react: {
      version: `999.999.999`,
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: { jsx: true },
    sourceType: `module`,
  },
};
