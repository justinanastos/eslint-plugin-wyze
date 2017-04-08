'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../max-file-length')

new RuleTester().run('max-file-length', rule, {
  valid: [
    {
      code:
      `
      function noop() {}
      `,
    },
    {
      code:
      `
      function noop() {}
      `,
      options: [ 5 ],
    },
  ],
  invalid: [
    {
      code:
      `
      function noop() {
        console.log('This function does nothing.')
      }
      `,
      errors: [
        { message: 'Max lines set to 3. File contains 5 lines.' },
      ],
      options: [ 3 ],
    },
  ],
})
