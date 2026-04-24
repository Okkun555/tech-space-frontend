import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {fieldLabels, validationMessages} from "../../../constants/validationMessages";

const signupSchema = z
    .object({
        email: z
            .email(validationMessages.invalidFormat(fieldLabels.email))
            .min(1, validationMessages.required(fieldLabels.email)),
        password: z
            .string()
            .min(1, validationMessages.required(fieldLabels.password))
            .min(8, validationMessages.minLength(fieldLabels.password, 8)),
        passwordConfirmation: z
            .string()
            .min(1, validationMessages.required(fieldLabels.passwordConfirmation)),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: validationMessages.mismatch(fieldLabels.passwordConfirmation),
        path: ["passwordConfirmation"],
    })

type SignupFormValues = z.infer<typeof signupSchema>

export const useSignup = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<SignupFormValues>({
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        resolver: zodResolver(signupSchema),
    })

    const onSubmit = (data: SignupFormValues) => {
        console.log("送信処理", data)
    }

    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
    }
}
