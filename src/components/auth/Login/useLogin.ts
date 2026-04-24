import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import useSWRMutation from "swr/mutation";
import {z} from "zod";
import {fieldLabels, validationMessages} from "../../../constants/validationMessages";
import {postFetcher} from "../../../libs/api";

const loginSchema = z.object({
    email: z
        .email(validationMessages.invalidFormat(fieldLabels.email))
        .min(1, validationMessages.required(fieldLabels.email)),
    password: z
        .string()
        .min(1, validationMessages.required(fieldLabels.password))
        .min(8, validationMessages.minLength(fieldLabels.password, 8)),
})

type LoginFormValues = z.infer<typeof loginSchema>

type LoginRequest = {
    session: {
        email: string
        password: string
    }
}

type LoginResponse = {
    id: number
    email: string
}

export const useLogin = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginSchema),
    })

    const { trigger, isMutating } = useSWRMutation(
        "/api/auth/login",
        postFetcher<LoginResponse, LoginRequest>,
    )

    const onSubmit = async (data: LoginFormValues) => {
        await trigger({
            session: {
                email: data.email,
                password: data.password,
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
