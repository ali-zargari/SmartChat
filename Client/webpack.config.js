import webpack from "webpack";
import path from "path";
import { fileURLToPath, resolve } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	mode: "development",
	entry: "./src/main.jsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].bundle.js",
		publicPath: "/",
	},
	devServer: {
		historyApiFallback: true,
		//contentBase: './',
		hot: true,
		static: {
			directory: path.join(__dirname, "public"),
		},
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: path.resolve(__dirname, 'src/backend'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(scss|css)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/i,
				use: ["file-loader"],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"],
		fallback: {
			http: false,
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "index.html"),
		}),
	],
	optimization: {
		runtimeChunk: "single",
	},
};
