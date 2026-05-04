export const validationMessages = {
    required: (label: string) => `${label}を入力してください`,
    select: (label: string) => `${label}を選択してください`,
    invalidFormat: (label: string) => `${label}の形式が正しくありません`,
    minLength: (label: string, length: number) =>
        `${label}は${length}文字以上で入力してください`,
    maxLength: (label: string, length: number) =>
        `${label}は${length}文字以内で入力してください`,
    mismatch: (label: string) => `${label}が一致しません`,
    pastDate: (label: string) => `${label}は今日より前の日付を入力してください`,
}

export const fieldLabels = {
    email: "メールアドレス",
    password: "パスワード",
    passwordConfirmation: "パスワード（確認）",
    name: "アカウント名",
    birthday: "生年月日",
    gender: "性別",
    occupation: "職業",
    introduction: "自己紹介",
} as const
