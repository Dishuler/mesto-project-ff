const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  contest:  path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080
  },
  module: {
	rules: [{
		 test: /\.js$/,
		 use: 'babel-loader',
		 exclude: '/node_modules/'
	  },
	  {
		 test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
		 type: 'asset/resource',
	  },
	  {
		 test: /\.css$/,
		 use: [MiniCssExtractPlugin.loader, {
			  loader: 'css-loader',
			  options: {
				 importLoaders: 1
			  }
			},
			'postcss-loader'
		 ]
	  },
	]
 },
  plugins: [
    new HtmlWebpackPlugin({
		title: 'My App', //<--Название придожения.(ПОМЕНЯЙ ОБЯЗАТЕЛЬНО!!!)
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ]
}

