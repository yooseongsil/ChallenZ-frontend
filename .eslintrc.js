module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/prettier',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:vue/essential',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2020,
	},
	plugins: ['prettier', 'html', 'vue'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'prettier/prettier': [
			// https://prettier.io/docs/en/options.html
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 4,
				trailingComma: 'all',
				printWidth: 120,
				bracketSpacing: true,
				arrowParens: 'avoid',
				endOfLine: 'auto',
			},
		],
		'import/extensions': 0,
		'import/no-unresolved': 'off', // Allow unresolved imports
		'generator-star-spacing': 'off', // Allow async-await
		'no-plusplus': 'off',
		'no-undef': 'off',
		'no-param-reassign': 0,
		'import/no-extraneous-dependencies': 0,
		'no-useless-escape': 0,
		'consistent-return': 'off',
		'import/namespace': 'off',
		'require-await': 'error', // No async function without await
		'no-var': 'error',
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: [],
			},
		],
		'vue/order-in-components': [
			'error',
			{
				order: [
					'el',
					'name',
					'parent',
					'functional',
					['delimiters', 'comments'],
					'extends',
					'mixins',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'fetch',
					'asyncData',
					'data',
					'computed',
					'watch',
					'LIFECYCLE_HOOKS',
					'methods',
					'head',
					['template', 'render'],
					'renderError',
					['components', 'directives', 'filters'],
				],
			},
		],
		'vue/html-self-closing': ['off'],
		'vue/attributes-order': [
			'error',
			{
				order: [
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					'GLOBAL',
					'UNIQUE',
					'TWO_WAY_BINDING',
					'OTHER_DIRECTIVES',
					'OTHER_ATTR',
					'EVENTS',
					'CONTENT',
				],
			},
		],
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				mocha: true,
			},
		},
	],
};
