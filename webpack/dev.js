const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, '../app'),
	build: path.join(__dirname, '../build'),
	fonts: path.join(__dirname, '../fonts'),
	normalize: path.join(__dirname, '../node_modules/normalize.css'),
	node_modules: path.join(__dirname, '../node_modules'),
	font_awesome: path.join(__dirname, '../font-awesome-4.6.3/css/font-awesome.css')
}

const config = {
	devtool: 'inline-source-map',
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js',
	},
	module: {
		noParse: /quill.js/,
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: PATHS.app
			}
		],
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
			},
			{
				loaders: ['style', 'css'],
				include: [PATHS.app, PATHS.node_modules, PATHS.font_awesome],
				test: /\.css$/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.template.ejs',
			inject: 'body',
			chunksSortMode: 'dependency'
		}),
		new webpack.HotModuleReplacementPlugin({
			multiStep: true
		})
	],
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: 9000
	}
}

module.exports = config;