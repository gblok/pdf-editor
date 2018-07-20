import fastify from 'fastify'
import {readFileSync} from 'fs'
import cors from 'cors'
import '../.etc/config/global'
import {Init, PORT} from '../.etc/config/server'
import {Api, App} from './routes'
import {Static} from './plugins'
import {FormParser} from './middleware/upload'

const app = fastify({
    logger: {
        level:'info'
    },
    http2: true,
    https: {
        allowHTTP1: true,
        key: readFileSync('./.etc/ssl3/server.key'),
        cert: readFileSync('./.etc/ssl3/server.crt')
    }
})

app
    .use(cors())
    .addContentTypeParser('multipart/form-data', FormParser)
    .register(Static)
    .register(App)
    .register(Api, {prefix: '/api/v1'})
    .listen(PORT, Init)


//
// .then(Init)
// .catch(err => {
//     console.log('Error starting server:', err)
//     process.exit(1)
// })


