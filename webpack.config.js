var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: ['./trainer/main.ts'],
    output: {
        path: path.resolve(__dirname, '.'),
        publicPath: '/src/',
        filename: 'amd/src/trainer.js',
        libraryTarget: "amd"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true,
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },

            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[hash].[ext]'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=./fonts/[hash].[ext]'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=./fonts/[hash].[ext]'}
        ]
    },
    resolve: {
        extensions: ['.ts','.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    }
}

if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            mangle: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false
        }),
        // tell jshint to ignore the compiled file to play nicely with Moodle's build process
        new webpack.BannerPlugin({
            banner: '// jshint ignore: start',
            raw: true
        })
    ])
}
