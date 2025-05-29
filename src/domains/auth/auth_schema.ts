import z from "zod/v4"

const authBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres")
})

const forgotPasswordSchema = z.object({
    email: z.email(),
})

const resetPasswordSchema = z.object({
    token: z.string().min(1),
    newPassword: z.string().min(6)
})

type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>
type ResetPasswordBody = z.infer<typeof resetPasswordSchema>
type LoginBody = z.infer<typeof authBodySchema>

export {
    authBodySchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    LoginBody,
    ForgotPasswordBody,
    ResetPasswordBody
}