import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "../services/user_service";
import { z, ZodSafeParseError, ZodSafeParseResult, } from "zod/v4"

const usersService = new UsersService();


//Schemas com zod para tipagem e validação dos dados
const paramsWithIdSchema = z.object({
    id: z.string().transform((value) => {
        const parsedId = parseInt(value);
        if (isNaN(parsedId)) {
            throw new Error("ID inválido");
        }
        return parsedId;
    })
})

const createUserBodySchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.email(),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
})

const updateUserSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.email(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualização"
})

const updateUserPasswordSchema = z.object({
    currentPassword: z.string().min(6, 'A senha atual deve conter no mínimo 6 caracteres'),
    newPassword: z.string().min(6, "A nova senha deve conter no mínimo 6 caracteres")
})

// Extraindo os tipos dos schemas para substituir as interfaces
type ParamsWithId = z.infer<typeof paramsWithIdSchema>
type CreateUserBody = z.infer<typeof createUserBodySchema>
type UpdateUserBody = z.infer<typeof updateUserSchema>
type UpdatePasswordBody = z.infer<typeof updateUserPasswordSchema>

function formatError(result: ZodSafeParseError<any>) {
    return z.prettifyError(result.error)
}

export const usersController = {
    async create(request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
        try {
            const result = createUserBodySchema.safeParse(request.body);

            if (!result.success) {
                return reply.status(400).send({
                    message: "Dados inválidos",
                    errors: formatError(result)
                });
            }
            const user = await usersService.createUser(result.data);
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
            const result = paramsWithIdSchema.safeParse(request.params)
            if (!result.success) {
                return reply.status(400).send({
                    message: "ID inválido",
                    errors: formatError(result)
                });
            }
            const userId = result.data.id
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
            const paramsResult = paramsWithIdSchema.safeParse(request.params)

            if (!paramsResult.success) {
                return reply.status(400).send({
                    message: "ID inválido",
                    errors: formatError(paramsResult)
                });
            }

            const bodyResult = updateUserSchema.safeParse(request.body)

            if (!bodyResult.success) {
                return reply.status(400).send({
                    message: "Dados inválidos",
                    errors: formatError(bodyResult)
                })
            }

            const userId = paramsResult.data.id;
            const data = bodyResult.data

            const user = await usersService.update(userId, data);
            return reply.send(user);

        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Erro interno do servidor" });
        }
    },

    async updatePassword(request: FastifyRequest<{ Params: ParamsWithId; Body: UpdatePasswordBody }>, reply: FastifyReply) {
        try {
            const paramsResult = paramsWithIdSchema.safeParse(request.params)
            if (!paramsResult.success) {
                return reply.status(400).send({
                    message: "ID inválido",
                    errors: formatError(paramsResult)
                })
            }

            const bodyResult = updateUserPasswordSchema.safeParse(request.body)

            if (!bodyResult.success) {
                return reply.status(400).send({
                    message: 'Dados inválidos',
                    errors: formatError(bodyResult)
                })
            }

            const userId = paramsResult.data.id
            const data = bodyResult.data

            const user = await usersService.updatePassword(userId, data)

            return reply.send(user)


        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Erro interno do servidor" });
        }
    },

    async delete(request: FastifyRequest<{ Params: ParamsWithId }>, reply: FastifyReply) {
        try {
            const result = paramsWithIdSchema.safeParse(request.params)

            if (!result.success) {
                return reply.status(400).send({
                    message: "ID inválido",
                    errors: formatError(result)
                })
            }
            const userId = result.data.id
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
