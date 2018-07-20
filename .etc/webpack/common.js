import webpack from 'webpack'
import {EXCLUDE, ROOT, STATIC, VENDOR, SRC} from '../config/paths'

const {ProvidePlugin, DllReferencePlugin, DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin, NamedModulesPlugin, HotModuleReplacementPlugin, optimize: {ModuleConcatenationPlugin}} = webpack

export const
    Common = ({IS_DEV = false}) => {
        return {
            node: {fs: 'empty'},
            mode: IS_DEV ? 'development' : 'production',
            context: ROOT,
            output: {
                path: STATIC,
                filename: 'assets/js/[name].js',
                chunkFilename: 'assets/js/[name].js',
                sourceMapFilename: '[file].map',
                libraryTarget: 'umd',
                // chunkMode:     'lazy-once'
            },
            devtool: false,
            cache: true,
            performance: false,
            profile: true,
            stats: 'minimal',
            //stats: 'detailed',
            resolve: {
                unsafeCache: true,
                extensions: ['.js', '.json', '*'],
                modules: ['node_modules']
            },
            resolveLoader: {modules: ['node_modules']},
            optimization: {
                occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
            }
        }
    },
    Rules = ({IS_DEV = false}) => [
        {
            test: /\.js$/,
            exclude: EXCLUDE,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['env']],
                    cacheDirectory: 'tmp',
                    plugins: [
                        'syntax-dynamic-import',
                        'transform-class-properties',
                        'transform-object-rest-spread',
                        ['inferno', {'imports': true}]
                    ]
                }
            }
        },
        {
            test: /\.less$/,
            exclude:
            EXCLUDE,
            use: IS_DEV
                ? [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader', options: {path: SRC}}]
                : [
                    {loader: 'file-loader', options: {name: 'assets/css/[name].css'}},
                    {loader: 'less-loader', options: {path: SRC}}]
        },
        {
            test: /\.(png|jpg|gif|ttf)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        }
    ],
    Plugins = ({IS_DEV = false, IS_ADMIN = false, IS_SERVER = false, IS_CLIENT = true}) => [
        new DllReferencePlugin({context: ROOT, manifest: require(VENDOR)}),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            sourceMap: false
        }),
        new ProvidePlugin({
            Promise: 'zousan',
            //html2pdf:'html2pdf.js/dist/html2pdf.js'
        }),
        new DefinePlugin({
            IS_CLIENT,
            IS_SERVER,
            IS_DEV,
            IS_ADMIN,
            'process.env': {'NODE_ENV': JSON.stringify(IS_DEV ? 'production' : 'production')}
        }),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin,
        IS_DEV
            ? (new NamedModulesPlugin, new HotModuleReplacementPlugin)
            : () => null //new BundleAnalyzerPlugin
    ]