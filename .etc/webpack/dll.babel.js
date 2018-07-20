import webpack from 'webpack'
import {ASSETS, DLL, ROOT} from '../config/paths'

const {DllPlugin, DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin, optimize: {ModuleConcatenationPlugin}} = webpack

export default {
    node: {fs: 'empty'},
    cache: true,
    context: ROOT,
    performance: false,
    mode: 'production',
    entry: {
        vendor: [
            'inferno',
            'eventemitter3',
            'zousan',
            //'quill',
            //'pdfjs',
            'superagent',
            //'lokijs',
            //'most',
            //'babel-polyfill',
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: ASSETS,
        library: '[name]',
        libraryTarget: 'umd'
    },
    plugins: [
        new DllPlugin({context: ROOT, path: DLL, name: '[name]'}),
        new DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new LoaderOptionsPlugin({minimize: true, debug: false}),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin,
    ],
    resolve: {
        unsafeCache: true,
        extensions: ['.js', '.es6', '.jsx', '.pug', '.less', '.svg'],
        modules: ['node_modules']
    },
    resolveLoader: {modules: ['node_modules']}
}