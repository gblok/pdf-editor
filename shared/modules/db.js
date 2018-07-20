import Loki from 'lokijs'
import {dbCollOpts, dbId, dbName} from '../../.etc/config/db'
import {LOKI} from '../../.etc/config/paths'
import {LOG} from './log'


const init = () => {

    LOG('loki init')

    let {LokiLocalStorageAdapter: Adapter} = Loki,
        name = dbName,
        env = IS_SERVER ? 'NODE' : 'BROWSER'


    if (IS_SERVER) {
        require('./fs-manager').reMkDirSync(LOKI)
        Adapter = require('lokijs/src/loki-fs-structured-adapter')
    }

    const
        adapter = new Adapter,
        opts = {
            env,
            adapter,
            // verbose: true,
            // autosave: true,
            // autoload: true,
            // autosaveInterval: 4000,
            // autoloadCallback: () => LOG(`loki auto init`)
        }


    const db = new Loki(name, opts)

    //load db
    // if (IS_SERVER)
    //     db.loadJSON(JSON.stringify(require(loadDbPayh)))

   // LOG({db})

    return db
}


export const
    db = init(),
    upsert = (coll, doc) => {
        if (Reflect.has(doc, dbId)) {
            const curr = coll.by(dbId, doc[dbId])
            curr
                ? coll.update(Object.assign(curr, doc))
                : coll.insertOne(doc)
        }
    }
