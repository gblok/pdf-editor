import {resolve} from 'path'

export const
    ROOT = process.cwd(),
    EXCLUDE = resolve(ROOT, 'node_modules'),
    SRC = resolve(ROOT, 'src'),
    STATIC = resolve(ROOT, 'static'),
    ASSETS = resolve(STATIC, 'assets'),
    DLL = resolve(ASSETS, 'dll', '[name].json'),
    VENDOR = resolve(ASSETS, 'dll', 'vendor.json'),
    LOKI = resolve(STATIC, 'db'),
    STORAGE = resolve(ROOT, 'storage'),
    FONTS = resolve(ASSETS, 'fonts')

// SERVER = resolve(ROOT, 'server'),
// SHARED = resolve(ROOT, 'shared'),
// SVG = resolve(STATIC, 'svg'),
// FAVICON = resolve(ASSETS, 'img', 'favicon.png'),
// WORKERS = resolve(STATIC,  'workers'),
// CONFIG = resolve(ROOT, '.etc')
// DEV_CONFIG =  resolve(CONFIG, 'webpack', 'dev.babel.js')
// UPLOADS = resolve(ROOT, 'uploads'),
