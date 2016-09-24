const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');

const PATHS = {
	app: path.join(__dirname, '../app'),
	build: path.join(__dirname, '../build'),
	fonts: path.join(__dirname, '../fonts'),
	normalize: path.join(__dirname, '../node_modules/normalize.css'),
	node_modules: path.join(__dirname, '../node_modules'),
	font_awesome: path.join(__dirname, '../font-awesome-4.6.3/css/font-awesome.css')
}

const env = {
	'process.env.NODE_ENV': JSON.stringify('production')
}

const config = {
	devtool: 'source-map',
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].[chunkhash].js',
		chunkFilename: 'name].[chunkhash].js'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				include: PATHS.app,
				query: {
					presets: ['es2015', 'react'],
					compact: false
				}
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.template.ejs',
			inject: 'body',
			chunksSortMode: 'dependency'
		}),
		new CleanWebpackPlugin([PATHS.build], {
			root: process.cwd()
		}),
		new webpack.DefinePlugin(env),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new CopyWebpackPlugin([{ from: 'config.js', to: 'config.js'}], {})
	]
}

config.module.loaders.push({
	test: /\.css$/,
	loader: ExtractTextPlugin.extract('style', 'css'),
	include: [PATHS.app, PATHS.node_modules, PATHS.font_awesome]
});

config.plugins.push(
	new ExtractTextPlugin('[name].[chunkhash].css')
);

config.entry.vendor = Object.keys(pkg.dependencies);
config.plugins.push(
	new webpack.optimize.CommonsChunkPlugin({
		names: ['vendor']
	})
);

module.exports = config;
