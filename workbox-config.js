module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{html,css,js}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};