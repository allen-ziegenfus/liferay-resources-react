module.exports = {
	verbose: true,
	transform: {
		'^.+\\.js$': 'babel-jest',
		'\\.css$': 'jest-transform-css'
	}
};
