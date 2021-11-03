module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'google',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 13,
        'sourceType': 'module',
    },
    'plugins': [
        '@typescript-eslint',
    ],
    'rules': {
        'indent': ['error', 4],
        'max-len': ['error', {'ignoreComments': true, 'code': 100}],
        'new-cap': 0,
    },
};
