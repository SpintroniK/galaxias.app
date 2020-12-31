const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const dev = process.env.NODE_ENV === 'dev'
const dist = path.resolve(__dirname, 'dist')

const appConfig =
{
    devServer: { historyApiFallback: true },
    entry: './src/main.js',
    output: 
    {
        path: dist,
        filename: 'app.js',
        publicPath: ""
    },
    devtool: dev? 'source-map' : false,
    module:
    {
        rules: 
        [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: 
                [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: 
                [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
        ]
    },
    mode: dev? 'development': 'production',
    plugins: 
    [
        //new CleanWebpackPlugin(),
        new HtmlWebpackPlugin( { template: 'index.html' } ),
        //new WasmPackPlugin( { crateDirectory: path.resolve(__dirname, 'crate') } ),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin()
    ]
};

if(!dev)
{
    appConfig.plugins.push(new TerserPlugin
    ({
        parallel: true,
        sourceMap: false,
        terserOptions: 
        {
            ecma: 6,
        }
    }))

    appConfig.optimization =  {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
      }
}


module.exports = [appConfig];