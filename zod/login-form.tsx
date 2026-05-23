
import z from "zod"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginFormSchema = (t: (key: any) => string) => {
    return z.object({
        email: z
            .string()
            .min(1, {message: t('emailMessageRequired')})
            .email({message: t('emailMessageInvalid')}),
        
        password: z
            .string()
            .min(1, {message: t('passwordMessageRequired')})
            .regex(passwordRegex, {message: t('passwordMessageInvalid')}),

        rememberMe: z.boolean()
    })
}

export type LoginValues = z.infer<ReturnType<typeof loginFormSchema>>;