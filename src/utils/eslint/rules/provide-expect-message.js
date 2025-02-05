module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Provide an assertion message in expect statement',
      recommended: true
    },
    schema: []
  },
  create: function (context) {
    return {
      // CallExpression is an AST (Abstract Syntax Tree) node type that represents function calls
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'expect') {
          const parent = node.parent;
          if (
            // looking for such pattern "expect().someMethod()""
            parent &&
            parent.type === 'MemberExpression' && //  represents the dot notation (like expect().toMatchObject)
            parent.parent &&
            parent.parent.type === 'CallExpression'
          ) {
            if (node.arguments.length === 1) {
              // If 'expect()' has exactly one argument, it means the message is missing
              context.report({
                node: node,
                message: 'Expect statement should include an assertion message as the second argument',
                fix: function (fixer) {
                  return null;
                }
              });
            }
          }
        }
      }
    };
  }
};
