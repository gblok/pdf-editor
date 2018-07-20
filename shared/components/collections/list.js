import {hub} from '../../modules'

let active = null

const handler = doc => {

    let isActive = doc.id === active

    return <li
        className={isActive ? 'active' : null}
        onClick={() => {
            hub.emit('EDITOR', isActive ? {ops: []} : doc)
            hub.emit('PUSH', 'docs')
            active = isActive ? null : doc.id
        }}>{doc.id}</li>
}

export default ({coll}) => coll ? <ul className='list'>
    {coll
        .chain()
        //.simplesort('created', {desc: 1})
        //.limit(10)
        .map(handler)
        .data()
    }</ul> : null