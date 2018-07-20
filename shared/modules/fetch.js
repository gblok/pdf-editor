import request from 'superagent'
import {ERR, LOG} from './'

const api = '//localhost:9292/api/v1/'

const fetch = async ({method = 'get', cid = 'docs', uri = null, data = Object.create(null)}) => {


    LOG('fetch', {cid})

    let res = Object.create(null)

    if (uri || cid) {
        uri = cid ? `${api}${cid}` : uri

        res = await request[method](uri)
            .send({...data})
            .then(({body}) => body)
            .catch(ERR)


    }

    return res
}


export {fetch}