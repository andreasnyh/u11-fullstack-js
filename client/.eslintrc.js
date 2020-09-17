module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'prettier', 'simple-import-sort'],
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    },
    'import/resolver': {
      node: { moduleDirectory: ['node_modules', 'src/'] }
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/sort': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
