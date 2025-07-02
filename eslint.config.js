import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextConfig from 'eslint-config-next';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  nextConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  }
);