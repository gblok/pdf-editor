import {Component, LOG, store} from '../../modules'
import List from '../collections/list'


export default class extends Component {

    coll = null


    componentDidMount() {
        this.coll = store.get({cid: 'docs'}, this)
    }


    render() {
        LOG('render Aside')

        return <aside><List coll={this.coll}/></aside>
    }

}