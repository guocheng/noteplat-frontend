var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        javascript: [
            'webpack-dev-server/client?http://127.0.0.1:3000',
            'webpack/hot/only-dev-server',
            './app/src/index.js'
        ],
        vendors: ['react', 'flux', 'object-assign', 'keymirror']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: './js/app.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel-loader'],
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        },{
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', './js/vendors.js'),
        new ExtractTextPlugin(
            'all.css',
            {allChunks: true})
    ]
};
