module.exports = {
	parser: "@typescript-eslint/parser",
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "prettier"],
	rules: {
		"prettier/prettier": "error",
		semi: ['error', 'never'], // セミコロンを省略する設定を追加
		"react/react-in-jsx-scope": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
}
