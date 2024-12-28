import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: true,

  typescript: true,

  jsonc: false,
  yaml: false,
  ignores: ['./node_modules', './build', './dist'],
  rules: {
    'semi': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-console': 'warn',
    'no-multiple-empty-lines': 'error',
    'style/semi': ['error', 'always'],
    'style/brace-style': ['error', '1tbs'],
    'style/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: true,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
          },
        },
      },
    ],
    'ts/no-namespace': 'off',
    'ts/no-redeclare': 'off',
    'ts/consistent-type-imports': 'off',
    'ts/consistent-type-definitions': 'off',
    'test/prefer-lowercase-title': 'off',
    'unused-imports/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'style/arrow-parens': 'off',
  },
});
