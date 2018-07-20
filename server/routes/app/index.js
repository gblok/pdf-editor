import Controller from '../../controllers/ssr'


export const App = async (fastify, options)  => {
    fastify.get('/', Controller)
}
