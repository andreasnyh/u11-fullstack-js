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
    'no-console': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/sort': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['InputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['Input'],
        depth: 3
      }
    ]
  },
  overrides: [
    {
      // Disable simple-import-sort for Calendar file
      files: './src/components/elements/Calendar.jsx',
      rules: {
        'simple-import-sort/sort': 'off'
      }
    }
  ]
};
