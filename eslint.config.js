// La presentación es independiente del lint TypeScript del monorepo.
export default [
  { ignores: ['**/.hyperframes/**', '**/.thumbnails/**', '**/node_modules/**', 'verification/**', 'video/assets/gsap.min.js'] },
  {
    files: ['tools/*.mjs', 'eslint.config.js'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-unreachable': 'error',
    },
  },
];
