import {Common, Plugins, Rules} from './common'

const
    client = () => {
        const opts = Object.create(null)
        return {
            entry: {app: ['./src/client', './src/client/client.less']},
            ...Common(opts),
            plugins: Plugins(opts),
            module: {rules: Rules(opts)}
        }
    }

export default () => [client()]

