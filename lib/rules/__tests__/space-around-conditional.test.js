/* eslint-disable wyze/max-file-length */
import { RuleTester } from 'eslint'
import rule from '../space-around-conditional'
import test from 'ava'

const parserOptions = {
  ecmaVersion: 2017,
  sourceType: 'module',
}
const expectedError = ( loc, type, suffix = 'Statement' ) => ({
  message: `A space is required ${loc} '${loc === 'after' ? '(' : ')'}'.`,
  type: `${type}${suffix}`,
})

test(() => {
  new RuleTester().run('space-around-conditional', rule, {
    valid: [
      {
        code:
          `
          if ( 1 + 1 === 2 && true ) {
            // Do something...
          }
          `,
      },
      {
        code:
          `
          if (
            1 + 1 === 2 && true
          ) {
            // Do something...
          }
          `,
      },
      {
        code:
          `
          for ( var i = 0; i < 10; i++ ) {
            // Do something...
          }
          `,
      },
      {
        code:
          `
          for ( ;; ) {
            // Do something...
          }
          `,
      },
      {
        code:
          `
          for ( ;true; ) {
            // Do something...
          }
          `,
      },
      {
        code:
          `
          while ( true ) {
            // Do something...
          }
          `,
      },
      {
        code:
          `
          do {
            // Do something...
          } while ( true )
          `,
      },
      {
        code:
        `
        switch ( true ) {
          // Do something...
        }
        `,
      },
      {
        code:
        `
        for ( const letter of 'hello' ) {
          // Do something...
        }
        `,
        parserOptions,
      },
      {
        code:
        `
        for ( const prop in {} ) {
          // Do something...
        }
        `,
        parserOptions,
      },
      {
        code:
        `
        try {
          // Do something...
        } catch ( ex ) {}
        `,
        parserOptions,
      },
    ],
    invalid: [
      {
        code:
          `
          if (true ) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'If'),
        ],
      },
      {
        code:
          `
          if ( true) {
            // Do something...
          }
          `,
        errors: [
          expectedError('before', 'If'),
        ],
      },
      {
        code:
          `
          if (true) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'If'),
          expectedError('before', 'If'),
        ],
      },
      {
        code:
        `
        if (( a = true )) {
          // Do something...
        }
        `,
        errors: [
          expectedError('after', 'If'),
          expectedError('before', 'If'),
        ],
      },
      {
        code:
          `
          if (true ) {
            // Do something...
          } else if (true ) {
            // Do something else...
          }
          `,
        errors: [
          expectedError('after', 'If'),
          expectedError('after', 'If'),
        ],
      },
      {
        code:
          `
          if ( true) {
            // Do something...
          } else if ( true) {
            // Do something else...
          }
          `,
        errors: [
          expectedError('before', 'If'),
          expectedError('before', 'If'),
        ],
      },
      {
        code:
          `
          if (true) {
            // Do something...
          } else if (true) {
            // Do something else...
          }
          `,
        errors: [
          expectedError('after', 'If'),
          expectedError('before', 'If'),
          expectedError('after', 'If'),
          expectedError('before', 'If'),
        ],
      },
      {
        code:
          `
          if (true) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'If'),
          expectedError('before', 'If'),
        ],
      },
      {
        code:
          `
          for (var i = 0; i < 1; i++ ) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'For'),
        ],
      },
      {
        code:
          `
          for ( var i = 0; i < 1; i++) {
            // Do something...
          }
          `,
        errors: [
          expectedError('before', 'For'),
        ],
      },
      {
        code:
          `
          for (var i = 0; i < 1; i++) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'For'),
          expectedError('before', 'For'),
        ],
      },
      {
        code:
          `
          for (;; ) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'For'),
        ],
      },
      {
        code:
          `
          for ( ;;) {
            // Do something...
          }
          `,
        errors: [
          expectedError('before', 'For'),
        ],
      },
      {
        code:
          `
          for (;;) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'For'),
          expectedError('before', 'For'),
        ],
      },
      {
        code:
          `
          while (true ) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'While'),
        ],
      },
      {
        code:
          `
          while ( true) {
            // Do something...
          }
          `,
        errors: [
          expectedError('before', 'While'),
        ],
      },
      {
        code:
          `
          while (true) {
            // Do something...
          }
          `,
        errors: [
          expectedError('after', 'While'),
          expectedError('before', 'While'),
        ],
      },
      {
        code:
          `
          do {
            // Do something...
          } while (true )
          `,
        errors: [
          expectedError('after', 'DoWhile'),
        ],
      },
      {
        code:
          `
          do {
            // Do something...
          } while ( true)
          `,
        errors: [
          expectedError('before', 'DoWhile'),
        ],
      },
      {
        code:
          `
          do {
            // Do something...
          } while (true)
          `,
        errors: [
          expectedError('after', 'DoWhile'),
          expectedError('before', 'DoWhile'),
        ],
      },
      {
        code:
        `
        switch (true ) {
          // Do something...
        }
        `,
        errors: [
          expectedError('after', 'Switch'),
        ],
      },
      {
        code:
        `
        switch ( true) {
          // Do something...
        }
        `,
        errors: [
          expectedError('before', 'Switch'),
        ],
      },
      {
        code:
        `
        switch (true) {
          // Do something...
        }
        `,
        errors: [
          expectedError('after', 'Switch'),
          expectedError('before', 'Switch'),
        ],
      },
      {
        code:
        `
        for (const letter of 'hello' ) {
          // Do something...
        }
        `,
        errors: [
          expectedError('after', 'ForOf'),
        ],
        parserOptions,
      },
      {
        code:
        `
        for ( const letter of 'hello') {
          // Do something...
        }
        `,
        errors: [
          expectedError('before', 'ForOf'),
        ],
        parserOptions,
      },
      {
        code:
        `
        for (const letter of 'hello') {
          // Do something...
        }
        `,
        errors: [
          expectedError('after', 'ForOf'),
          expectedError('before', 'ForOf'),
        ],
        parserOptions,
      },
      {
        code:
        `
        for (const prop in {} ) {
          // Do something...
        }
        `,
        errors: [
          expectedError('after', 'ForIn'),
        ],
        parserOptions,
      },
      {
        code:
        `
        for ( const prop in {}) {
          // Do something...
        }
        `,
        errors: [
          expectedError('before', 'ForIn'),
        ],
        parserOptions,
      },
      {
        code:
        `
        for (const prop in {}) {
          // Do something...
        }
        `,
        errors: [
          expectedError('after', 'ForIn'),
          expectedError('before', 'ForIn'),
        ],
        parserOptions,
      },
      {
        code:
        `
        try {
          // Do something...
        } catch (ex ) {}
        `,
        errors: [
          expectedError('after', 'Catch', 'Clause'),
        ],
        parserOptions,
      },
      {
        code:
        `
        try {
          // Do something...
        } catch ( ex) {}
        `,
        errors: [
          expectedError('before', 'Catch', 'Clause'),
        ],
        parserOptions,
      },
      {
        code:
        `
        try {
          // Do something...
        } catch (ex) {}
        `,
        errors: [
          expectedError('after', 'Catch', 'Clause'),
          expectedError('before', 'Catch', 'Clause'),
        ],
        parserOptions,
      },
    ],
  })
})
