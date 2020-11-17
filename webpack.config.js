var p = process.env.NODE_ENV;
console.log('****** NODE_ENV = ' + p + ' *******');

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env) => {
	const config = {
		entry: {
			index: './src/index.js',
		},
		module: {
			rules: [
				{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader?retainLines=true' },
				{ test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
				{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
				{ test: /\.(png|jpg|gif|svg)$/, use: [{ loader: 'file-loader', options: { publicPath: '../', name: 'img/[path][name].[ext]', context: 'src' } }] },
				{ test: /\.(ogv|mp4)$/, use: [{ loader: 'file-loader', options: { name: 'vid/[path][name].[ext]', context: 'src' } }] },
				{ test: /\.(wav|mp3)$/, use: [{ loader: 'file-loader', options: { name: 'aud/[path][name].[ext]', context: 'src' } }] },
				{ test: /\.(eot|woff|woff2|ttf)$/, use: [{ loader: 'file-loader', options: { name: 'font/[path][name].[ext]', context: 'src' } }] },
			],
		},
		resolve: {
			extensions: ['*', '.js', '.jsx'],
			alias: {
				LESCA: path.resolve(__dirname, 'src/LESCA/'),
				UI: path.resolve(__dirname, 'src/LESCA/UI/'),
				DEVICE: path.resolve(__dirname, 'src/LESCA/Device/'),
				EVENT: path.resolve(__dirname, 'src/LESCA/Event/'),
				UNIT: path.resolve(__dirname, 'src/LESCA/Unit/'),
				SOCIAL: path.resolve(__dirname, 'src/LESCA/Social/'),
			},
		},
		output: {
			path: path.resolve(__dirname, 'dist/'),
			filename: 'js/[name].min.js',
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				__REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
			}),
			new MiniCssExtractPlugin({
				filename: './css/[name].css',
			}),
		],
		optimization: {
			minimize: p == 'production',
			minimizer: [
				new TerserPlugin({
					sourceMap: false,
					cache: true,
					parallel: true,
					extractComments: false,
					terserOptions: { output: { comments: false } },
				}),
			],
		},
		devtool: 'cheap-inline-module-source-map',
		devServer: {
			contentBase: './dist',
			hot: true,
			host: '0.0.0.0',
			port: 8080,
			public: 'localhost:8080',
			disableHostCheck: true,
			https: false,
		},
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		},
	};
	if (env && env.unused) {
		config.plugins.push(
			new UnusedFilesWebpackPlugin({
				globOptions: {
					patterns: ['src/**/*.js', 'src/**/*.png', 'src/**/*.jpg'],
					ignore: ['node_modules/**/*', 'dist/**/*', '*.json', '**/*.config.*', '*.md', 'src/LESCA/**/*'],
				},
			})
		);
	}
	if (env && env.cdn) {
		config.module[3].use[0].options.name = env.cdn + 'img/[path][name].[ext]';
	}
	return config;
};
