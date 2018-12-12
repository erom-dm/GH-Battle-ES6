import path from 'path'
import  HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
    entry: ['@babel/polyfill', 'whatwg-fetch', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',

        // Magic needed to fix router refresh behavior
        publicPath: '/'
    },

    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },

    // Magic needed to fix router refresh behavior
    devServer:{
        historyApiFallback:  true
    },

    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
};
