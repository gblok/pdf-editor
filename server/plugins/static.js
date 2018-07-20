import serve from 'fastify-static'
import {STATIC} from '../../.etc/config/server'
export const Static = (f, opts, next) => (f.register(serve, {root: STATIC, prefix: '/'}),next())