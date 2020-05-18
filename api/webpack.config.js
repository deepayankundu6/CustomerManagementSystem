var path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: {
        'Controller/customers': path.resolve(__dirname, './Controller/customers.js'),
        'Controller/login': path.resolve(__dirname, './Controller/login.js'),
        'Controller/states': path.resolve(__dirname, './Controller/states.js'),
        'mongoDB/controller': path.resolve(__dirname, './mongoDB/controller.js'),
        './api': path.resolve(__dirname, './app.js'),
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