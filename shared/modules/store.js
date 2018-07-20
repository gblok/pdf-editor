import {compose, db, ERR, fetch, guid, hub, isObject, LOG, push$} from './'
import {dbCollOpts, dbId} from '../../.etc/config/db'
import * as R from './redusers'

const
    createKey = tx => {
        let {cid: suffix, api = null} = tx, postfix = api ? `_${Object.values(api).join('_')}` : ''
        return suffix + postfix
    },
    getTune = ({cid}) => Reflect.has(R, cid) ? R[cid] : R['duty'],
    tune = tx => getTune(tx)(tx),
    clearMeta = ({$loki, meta, ...rest}) => rest,
    push = ({ev, cid}, coll) => doc => {

        //LOG('PUSH', doc)

        if (doc) {
            const curr = coll.by(dbId, doc[dbId])
            switch (ev) {
                case 'DEL':
                    //  LOG('DEL', doc[dbId])
                    return curr ? coll.remove(curr) : null
                default:
                    if (curr) {
                        //  LOG('UP', doc[dbId])
                        coll.update({...curr, ...doc, modified: Date.now()})
                    } else {
                        // LOG('ADD', doc[dbId])
                        if (!doc.created)
                            Reflect.deleteProperty(doc, 'created')
                        // LOG('add', doc[dbId], doc.created ,Reflect.get(doc, 'created'),  Reflect.has(doc, 'created'))
                        coll.insertOne({created: Date.now(), ...doc})
                        if (IS_CLIENT && ev !== 'INIT') {
                            //   LOG('fetch', {doc})
                            fetch({method: 'post', cid, data: {doc}})
                        }

                    }
            }
        }
    },
    checkId = doc => isObject(doc) ? Reflect.has(doc, dbId) ? doc : {...doc, [dbId]: guid()} : null,
    change = (tx, coll) => compose(push(tx, coll), checkId, tune(tx), clearMeta)


const setCollTx = (tx, data) => {

    LOG('set', tx, data)

    if (data) {

        const
            {cid, ev = 'PUSH'} = tx,
            coll = getCollection(cid),
            key = createKey(tx),
            isMulti = Array.isArray(data)

        isMulti
            ? data.forEach(change(tx, coll))
            : change(tx, coll)(data)


        // LOG('set', {key})

        hub.emit(ev, key)

    }
}


//ToDO
const setStateTx = tx => {
}


const onCollTx = (tx, ctx = null) => {

    const key = createKey(tx)

    if (IS_CLIENT && ctx) {

        const isInit = Reflect.has(ctx, '_allowKeys')

        if (!isInit)
            Reflect.set(ctx, '_allowKeys', new Set)

        const allow = Reflect.get(ctx, '_allowKeys')

        allow.add(key)

        if (!isInit)
            push$
                .filter(key => allow.has(key))
                .observe(() => ctx.forceUpdate())
                .catch(ERR)

    }

    return tx
}


const addColl = cid => {

    const coll = db.addCollection(cid, dbCollOpts)

    if (IS_CLIENT) {
        fetch({cid}).then(data => {
            store.set({ev: 'INIT', cid}, data)
            hub.emit('PUSH', cid)
        }).catch(ERR)
    }


    return coll

}


const getCollection = cid => db.getCollection(cid) || addColl(cid)
const getCollTx = ({cid, raw = 0}) => getCollection(cid)

const
    getTx = (tx, ctx) => isObject(tx) ? compose(getCollTx, onCollTx)(tx, ctx) : getBy(tx),
    setTx = (tx, data) => isObject(tx) ? setCollTx(tx, data) : setBy(tx, data)

const
    getBy = id => getCollection('store').by('id', id),
    setBy = (id, data) => setCollTx({cid: 'store', ev: 'APP'}, Object.assign(data, {id}))

const store = {
    get: getTx,
    set: setTx,
    state: setStateTx
}


export {store, getCollection}


// if (['ADD', 'UPD', 'DEL'].includes(ev)) {
//
//     // LOG('PUSH', key)
//     LOG('store', {spark})
//
//     hub.emit('PUSH', key)
//
//
//     if (IS_SERVER || !spark)
//         hub.emit(ev, tx, data)
//
// }