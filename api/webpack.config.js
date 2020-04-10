var path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: './app.js',
    target: 'node',
    externals: [nodeExternals()],
    devServer: {
        port: 5000
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api.js'
    }
};