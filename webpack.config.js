var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'eval',
    entry: {
        javascript: [
            'webpack-dev-server/client?http://127.0.0.1:3000',
            'webpack/hot/only-dev-server',
            './js/app.jsx'
        ],
        html: './index.html'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [{
              test: /\.js?$/,
              exclude: /node_modules/,
              loader: 'jsxhint'
        }],
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: /node_modules/
            },
            {
              test: /\index.html$/,
              loader: 'file?name=[name].[ext]'
            }
        ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
