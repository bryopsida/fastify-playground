'use strict'
import { fastify } from 'fastify'
import { AuthApp } from './auth.js'
import { EchoApp } from './echo.js'


const server = fastify({
  logger: true
})

// schema validation, invalid requests result in 400 response
// status code with informative error
server.register(EchoApp)

// requires authentication
server.register(AuthApp, {
  prefix: 'auth'
})

server.listen({
  port: 3000
})

process.on('SIGINT|SIGTERM', async () => {
  await server.close()
})