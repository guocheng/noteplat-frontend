var webpack = require('webpack'),
    path = require('path');

module.exports = {
    devtool: 'eval',
    entry: {
        javascript: [
            'webpack-dev-server/client?http://127.0.0.1:3000',
            'webpack/hot/only-dev-server',
            './app/src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel-loader'],
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: 'style!css'
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
        new webpack.NoErrorsPlugin()
    ]
};
