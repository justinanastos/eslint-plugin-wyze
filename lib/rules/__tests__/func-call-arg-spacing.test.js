'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../func-call-arg-spacing')

const parserOptions = {
  ecmaVersion: 2017,
  sourceType: 'module',
}

const makeMissingError = location =>
  `There should be no space ${location} '${location === 'after' ? '(' : ')'}'.`

new RuleTester().run(
  'func-call-arg-spacing',
  rule,
  {
    valid: [
      {
        code:
        `
        const f = ( a, b ) => a + b

        f(1, 2)
        `,
        parserOptions,
      },
      {
        code:
        `
        const f = ( a, b ) => a + b

        f()
        `,
        parserOptions,
      },
      {
        code:
        `
        const f = ( a, b ) => a + b

        f(
          1,
          2,
        )
        `,
        parserOptions,
      },
      {
        code:
        `
        const app = { use: () => {} }

        app.use(( req, res ) => {})
        `,
        parserOptions,
      },
      {
        code: '[].filter(x => x)',
        parserOptions,
      },
    ],
    invalid: [
      {
        code:
        `
        const f = ( a, b ) => a + b

        f( 1, 2 )
        `,
        parserOptions,
        errors: [
          makeMissingError('after'),
          makeMissingError('before'),
        ],
        output:
        `
        const f = ( a, b ) => a + b

        f(1, 2)
        `,
      },
      {
        code:
        `
        const f = () => {}

        f( )
        `,
        errors: [
          makeMissingError('after'),
        ],
        parserOptions,
        output:
        `
        const f = () => {}

        f()
        `,
      },
      {
        code:
        `
        const keys = properties
          .filter( prop => !prop.computed )
          .map( prop => prop.key.name )
        `,
        errors: [
          makeMissingError('after'),
          makeMissingError('before'),
          makeMissingError('after'),
          makeMissingError('before'),
        ],
        parserOptions,
        output:
        `
        const keys = properties
          .filter(prop => !prop.computed)
          .map(prop => prop.key.name)
        `,
      },
    ],
  }
)
