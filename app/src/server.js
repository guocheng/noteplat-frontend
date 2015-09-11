var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../../webpack.dev.config');

var port = 3000;
var ip = 'localhost';

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  contentBase: './build'
}).listen(port, ip, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + ip + ':' + port);
});
