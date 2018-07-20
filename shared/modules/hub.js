import EventEmitter from 'eventemitter3'
import {fromEvent, merge} from 'most'

export const
    hub = new EventEmitter,
    app$ = fromEvent('APP', hub).multicast(),
    editor$ = fromEvent('EDITOR', hub).multicast(),
    script$ = fromEvent('SCRIPT', hub).multicast(),
    push$ = fromEvent('PUSH', hub).multicast()