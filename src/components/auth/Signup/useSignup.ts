import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import useSWRMutation from "swr/mutation";
import {z} from "zod";
import {fieldLabels, validationMessages} from "../../../constants/validationMessages";
import {postFetcher} from "../../../libs/api";

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

type SignupRequest = {
    user: {
        email: string
        password: string
        password_confirmation: string
    }
}

type SignupResponse = {
    id: number
    email: string
}

export const useSignup = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<SignupFormValues>({
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        resolver: zodResolver(signupSchema),
    })

    const { trigger, isMutating } = useSWRMutation(
        "/api/auth/signup",
        postFetcher<SignupResponse, SignupRequest>,
    )

    const onSubmit = async (data: SignupFormValues) => {
        await trigger({
            user: {
                email: data.email,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
            },
        })
    }

    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        isMutating,
    }
}
