var webpack = require('webpack'); // Requiring the webpack lib

module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://localhost:9090/', // Setting the URL for the hot reload
        // 'webpack/hot/only-dev-server', // Reload only the dev server
        './web-app/src/index.js'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot-loader/webpack!babel' // Include the react-hot loader
        },
            {
                test: /\.css$/,
                loader: 'style!css' // We add the css loader
            },
            {test: /\.json$/, loader: "json-loader"}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/web-app/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    node: {
        dns: 'mock',
        net: 'mock'
    }
    // ,
    // devServer: {
    //   contentBase: './web-app/dist',
    //   hot: true // Activate hot loading
    // },
    // plugins: [
    //   new webpack.HotModuleReplacementPlugin() // Wire in the hot loading plugin
    // ]
};
