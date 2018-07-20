import {readFileSync} from 'fs'
import {Common, Plugins, Rules} from './common'
import {PORT, STATIC} from '../config/client'

export default () => {
    const opts = {IS_DEV: true}
    return {
        entry: {app: ['./src/client', './src/client/client.less']},
        ...Common(opts),
        plugins: Plugins(opts),
        module: {rules: Rules(opts)},
        devServer: {
            disableHostCheck: true,
            https: true,
            compress: true,
            port: PORT,
            contentBase: STATIC,
            hot: true,
            stats: 'minimal',
            cert: readFileSync('.etc/ssl/server.crt'),
            key: readFileSync('.etc/ssl/server.key'),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
            },
            proxy: {'/api/**': {target: 'https://localhost:9292', secure: false}},
            // proxy: {
            //     "/api/v1/**": "https://[::1]:9292"
            //     // "secure": false,
            //     // "changeOrigin": true
            // },
            historyApiFallback: {index: '/'},
            watchOptions: {
                aggregateTimeout: 400,
                poll: 400
            }
        }
    }
}


// proxy: {
//     "*": [{target: 'https://localhost:9292'}]
// }
