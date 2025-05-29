import { z } from "zod/v4";

const paramsWithIdSchema = z.object({
    id: z.string().transform((value) => {
        const parsedId = parseInt(value);
        if (isNaN(parsedId)) {
            throw new Error("ID inválido");
        }
        return parsedId;
    })
})

const categoryParamsSchema = z.object({
    category: z.string().min(1, "A categoria é obrigatória").toLowerCase()
})

const createProductBodySchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    price: z.number().positive("O preço deve ser um número positivo"),
    stock: z.number().int().nonnegative("O estoque deve ser um número inteiro não negativo"),
    category: z.string().transform(val => val.trim() === '' ? 'Sem Categoria' : val).optional().default('Sem Categoria'),
    imageUrl: z.string()
})

const updateProductBodySchema = z.object({
    name: z.string().min(1, "O nome é obrigatório").optional(),
    description: z.string().min(1, "A descrição é obrigatória").optional(),
    price: z.number().positive("O preço deve ser um número positivo").optional(),
    stock: z.number().int().nonnegative("O estoque deve ser um número inteiro não negativo").optional(),
    category: z.string().min(1, "A categoria é obrigatória").optional(),
    imageUrl: z.string("A URL da imagem deve ser válida").optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualização"
})

type ParamsWithId = z.infer<typeof paramsWithIdSchema>
type CategoryParams = z.infer<typeof categoryParamsSchema>
type CreateProductBody = z.infer<typeof createProductBodySchema>
type UpdateProductBody = z.infer<typeof updateProductBodySchema>

export {
    paramsWithIdSchema,
    categoryParamsSchema,
    createProductBodySchema,
    updateProductBodySchema,
    ParamsWithId,
    CategoryParams,
    CreateProductBody,
    UpdateProductBody
}

