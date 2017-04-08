'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../newline-after-export')

const parserOptions = {
  ecmaVersion: 2017,
  sourceType: 'module',
}
const message = 'Expected newline after export statement.'

new RuleTester().run('newline-after-export', rule, {
  valid: [
    {
      code:
      `
      export const a = 1;
      export const b = 2;

      export default { a, b };
      `,
      parserOptions,
    },
  ],
  invalid: [
    {
      code:
      `
      export const a = 1;
      const b = 1;
      `,
      output:
      `
      export const a = 1;

      const b = 1;
      `,
      errors: [
        { message },
      ],
      parserOptions,
    },
  ],
})
