module.exports = {
	globDirectory: 'googlebooksclient/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,md,css,jsx,js,svg}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};