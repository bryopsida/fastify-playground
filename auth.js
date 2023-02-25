import { fastifyAuth } from '@fastify/auth'
import { fastifyBasicAuth } from '@fastify/basic-auth'

export function AuthApp(app, opts, done) {
  const authenticate = {
    realm: 'local'
  }
  
  function validate(username, password, req, reply, done) {
    if (username === 'admin' && password === 'admin') {
      done()
    } else {
      done(new Error('Denied'))
    }
  }

  app.register(fastifyBasicAuth, {
    validate,
    authenticate
  })
  app.register(fastifyAuth)
  app.after(() => {
    app.addHook('preHandler', app.auth([app.basicAuth]))
  })
  app.all('/', {
    handler: (req, reply) => {
      reply.send({
        hello: req.user
      })
    }
  })
  done()
}