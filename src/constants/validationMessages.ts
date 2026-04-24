export const validationMessages = {
    required: (label: string) => `${label}を入力してください`,
    invalidFormat: (label: string) => `${label}の形式が正しくありません`,
    minLength: (label: string, length: number) =>
        `${label}は${length}文字以上で入力してください`,
}

export const fieldLabels = {
    email: "メールアドレス",
    password: "パスワード",
} as const
