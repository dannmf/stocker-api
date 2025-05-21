import { FastifyInstance } from 'fastify'
import { usersController } from '../controllers/user_controller'

export async function userRoutes(fastify: FastifyInstance) {

  fastify.post('/user', usersController.create)
  
  fastify.get('/user', usersController.findAll)
  
  fastify.get('/user/:id', usersController.findById)
  
  fastify.put('/user/:id', usersController.update)
  
  fastify.delete('/user/:id', usersController.delete)
}