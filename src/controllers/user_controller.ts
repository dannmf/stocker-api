import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "../services/user_service";

const usersService = new UsersService();

interface ParamsWithId {
    id: string;
}

interface CreateUserBody {
    name: string;
    email: string;
    password: string;
}

interface UpdateUserBody {
    name?: string;
    email?: string;
    password?: string;
}

export const usersController = {
    async create(request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
        try {
            const { name, email, password } = request.body;
            const user = await usersService.createUser({ name, email, password });
            return reply.status(201).send(user);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Erro interno do servidor" });
        }
    },

    async findAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await usersService.findAll();
            return reply.status(200).send(users);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Erro interno do servidor" });
        }
    },

    async findById(request: FastifyRequest<{ Params: ParamsWithId }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const userId = parseInt(id);

            if (isNaN(userId)) {
                return reply.status(400).send({ message: "Invalid ID" });
            }
            const user = await usersService.findById(userId);
            return reply.status(200).send(user);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Erro interno do servidor" });
        }
    },
    async update(request: FastifyRequest<{ Params: ParamsWithId; Body: UpdateUserBody }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const userId = parseInt(id);
            const data = request.body;

            if (isNaN(userId)) {
                return reply.status(400).send({ message: "Invalid ID" });
            }

            const user = await usersService.update(userId, {
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (data.password && data.password.trim() !== '') {
                user['password'] = data.password
            }

            return reply.send(user);
            
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Erro interno do servidor" });
        }
    },

    async delete(request: FastifyRequest<{ Params: ParamsWithId }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const userId = parseInt(id);

            if (isNaN(userId)) {
                return reply.status(400).send({ message: "ID Inválido" });
            }

            await usersService.delete(userId);
            return reply.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Erro interno do servidor" });
        }
    },
}
