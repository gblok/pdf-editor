import {renderToString} from 'inferno-server'
import Shell from '../../shared/components/app'

const
    head = `<head><meta name='viewport' content='width=device-width,minimum-scale=1'/><meta charset='utf-8'/><title>PDF Editor</title><link rel="icon" href="/favicon.png"/><link href="/assets/css/client.css" rel="stylesheet"><link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></head>`,
    foot = `<script src='/assets/js/vendor.js'></script><script src='/assets/js/app.js'></script>`

export default async (req, reply) =>
    reply
        .type('text/html')
        .code(200)
        .send(`<!doctype html><html>${head}<body>${await renderToString(<Shell/>)}</body>${foot}</html>`)