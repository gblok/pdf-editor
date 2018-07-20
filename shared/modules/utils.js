export const
    isObject = v => {
        const type = typeof v
        return v != null && (type == 'object' || type == 'function')
    },
    isMobile = () => {
        let IsMobile = false
        try {
            IsMobile = !!((window.navigator && window.navigator.standalone) || navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i))
        } catch (e) {
            // continue regardless of error
        }

        return IsMobile
    },
    isChrome = () => Boolean(window.chrome),
    guid = () => [2, 1, 1, 1, 3].map(length => Array.from({length}, () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)).join('')).join('-'),
    compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),
    pipe = (...fns) => compose.apply(compose, fns.reverse()),
    delay = ms => new Promise(r => setTimeout(r, ms)),
    loadScript = src => new Promise((resolve, reject) => {
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.onload = resolve
        s.onerror = reject
        document.head.appendChild(s)
    }),
    obsKeysToString = obj => Object.entries(obj).map(i => i.join('=')).join(),
    scrollTo = (x = 0, y = 0) => window.scrollTo(x, y)



   export function dataUriToBuffer(uri){

        if (!/^data\:/i.test(uri))
            throw new TypeError(`uri does not appear to be a Data URI (must begin with "data:")`)

        uri = uri.replace(/\r?\n/g, '')

        const c = uri.indexOf(',')

        if (-1 === c || c <= 4)
            throw new TypeError('malformed data: URI')

        return new Buffer(uri.substring(c + 1), 'base64')
    }