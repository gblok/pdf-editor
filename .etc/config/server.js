export * from './paths'
import {ERR, LOG} from '../../shared/modules/log'
import pkg from '../../package.json'

export const
    PORT = 9292,
    APP = {dir: './app'},
    Init = err  => err   ? ERR(err)  : LOG(`${String.fromCharCode(9763)}: v.${pkg.version} : ${PORT}`)