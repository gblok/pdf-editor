import 'babel-polyfill'
import {hydrate} from '../../shared/modules'
import Shell from '../../shared/components/app'
hydrate(<Shell/>, document.body)