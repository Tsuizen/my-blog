module.exports = {
  'package.json': ['prettier --write'],
  '*.tsx': ['npx eslint --fix', 'prettier --write'],
  '*.md': ['markdownlint', 'prettier --write']
};
