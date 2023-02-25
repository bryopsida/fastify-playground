export function EchoApp(app, opts, done) {
  app.post('/echo', {
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
          }
        }
      }
    },
    handler: (req, reply) => {
      reply.send({
        hello: req.body.name
      })
    }
  })
  done()
}