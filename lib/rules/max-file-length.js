'use strict'

module.exports = {
  meta: {
    schema: [
      { type: 'number' },
    ],
  },
  create( context ) {
    const lines = context.getSourceLines().length
    const max = context.options[0] || 200
    const message = 'Max lines set to {{max}}. File contains {{lines}} lines.'

    return {
      Program( node ) {
        if ( lines > max ) {
          context.report({
            node,
            message,
            data: {
              lines,
              max,
            },
          })
        }
      },
    }
  },
}
