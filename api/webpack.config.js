var path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: {
        'Controller/customers': path.resolve('./Controller/customers.js'),
        'Controller/login': path.resolve('./Controller/login.js'),
        'Controller/states': path.resolve('./Controller/states.js'),
        'mongoDB/controller': path.resolve('./mongoDB/controller.js'),
        './app': path.resolve('./app.js'),
    },
    target: 'node',
    externals: [nodeExternals()],
    devServer: {
        port: 5000
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    }
};