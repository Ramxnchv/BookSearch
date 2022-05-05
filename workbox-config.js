module.exports = {
	globDirectory: 'googlebooksclient/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,md,css,jsx,js,svg}'
	],
	swDest: 'googlebooksclient/public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};