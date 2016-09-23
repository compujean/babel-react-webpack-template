const validator = require('webpack-validator');

const dev = require('./webpack/dev');
const build = require('./webpack/build');

const configs = {
	start: dev,
	build: build
}

const config = configs[process.env.npm_lifecycle_event];

module.exports = validator(config);