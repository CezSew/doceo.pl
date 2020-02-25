var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
// variables
var isProduction = process.argv.indexOf("production") >= 0;
var sourcePath = path.join(__dirname, "./frontend");
var outPath = path.join(__dirname, "./public/dist");
var hostPort = 3333;
// plugins
// var ExtractTextPlugin = require("extract-text-webpack-plugin"); depr
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// var WebpackCleanupPlugin = require("webpack-cleanup-plugin");
// const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const TerserJSPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const glob = require("glob-all");
// const PurgecssPlugin = require("purgecss-webpack-plugin");

module.exports = {
    context: sourcePath,
    entry: {
        main: ["./app.tsx"]
    },
    // , optimization: {
    //     minimizer: isProduction ? [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})] : [],
    //   },
    output: {
        path: outPath,
        filename: "bundle.js",
        chunkFilename: "[chunkhash].js",
        publicPath: isProduction ? "/" : "https://localhost:" + hostPort + "/"
    },
    target: "web",
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", "css", "pcss"],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // (jsnext:main directs not usually distributable es6 format, but es6 sources)
        mainFields: ["module", "browser", "main"],
        alias: {
            app: path.resolve(__dirname, "frontend/"),
            components: path.resolve(__dirname, "frontend/components/"),
            contexts: path.resolve(__dirname, "frontend/contexts/"),
            types: path.resolve(__dirname, "frontend/types/"),
        }
    },
    module: {
        rules: [
            // .ts, .tsx
            {
                test: [/\.tsx?$/, /\.ts?$/],
                use: [
                          "babel-loader",
                          "ts-loader"
                      ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                            // modifyVars: {}
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    // isProduction ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            // css
            {
                test: [/\.css$/],
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: '/public/path/to/',
                      },
                    },
                    'css-loader',
                ],
            },
            // static assets
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    plugins: [
        // new WebpackCleanupPlugin(),
        // new ExtractTextPlugin({
        //     filename: "styles.css",
        //     disable: !isProduction
        // }),
        // new ErrorOverlayPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: (isProduction ? "server" : "disabled"),
        // }),
        // new PurgecssPlugin({
        //     // Specify the locations of any files you want to scan for class names.
        //     paths: glob.sync([
        //         path.join(__dirname, "resources/views/**/*.blade.php"),
        //         path.join(__dirname, "frontend/**/*.*"),
        //     ])
        // })
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        inline: true,
        host: "127.0.0.1",
        port: hostPort,
        https: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        watchOptions: {
            exclude: [/bower_components/, /node_modules/]
        },
        historyApiFallback: {
            disableDotRule: true
        },
        stats: "minimal"
    },
    devtool: "cheap-module-eval-source-map",
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: "empty",
        net: "empty"
    }
};

