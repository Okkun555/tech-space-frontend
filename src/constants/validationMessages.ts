export const validationMessages = {
    required: (label: string) => `${label}を入力してください`,
    invalidFormat: (label: string) => `${label}の形式が正しくありません`,
    minLength: (label: string, length: number) =>
        `${label}は${length}文字以上で入力してください`,
    mismatch: (label: string) => `${label}が一致しません`,
}

export const fieldLabels = {
    email: "メールアドレス",
    password: "パスワード",
    passwordConfirmation: "パスワード（確認）",
} as const
