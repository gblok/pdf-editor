const opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

import {store} from '../../../shared/modules'

export const Api = async f =>
    f

        .get('/', (req, reply) => reply.send({data: 'api'}))
        .get('/:cid', (req, reply) => {

            const
                {cid} = req.params,
                coll = store.get({cid}),
                data = coll.chain().data({removeMeta:1})

            return reply.send(data)
        })
        .post('/:cid', (req, reply) => {
            const
                {doc} = req.body,
                {cid} = req.params
            store.set({cid}, doc)
            return reply.send(doc)
        })
        .delete('/:cid', (req, reply) => {
            const
                {doc} = req.body,
                {cid} = req.params
            store.set({cid}, doc)
            return reply.send(doc)
        })
        .put('/:cid', (req, reply) => {
            const
                {doc} = req.body,
                {cid} = req.params
            store.set({cid}, doc)
            return reply.send(doc)
        })
        .post('/', opts, (req, reply) => reply.send({data: 'post'}))
        .post('/upload', (req, reply) => {
            // LOG({req})
            //reply.send = {url: req.filePath}

        })