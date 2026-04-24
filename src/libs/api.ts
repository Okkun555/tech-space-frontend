export class ApiError extends Error {
    status: number
    data: unknown

    constructor(status: number, data: unknown) {
        super(`HTTP ${status}`)
        this.name = "ApiError"
        this.status = status
        this.data = data
    }
}

const request = async <TResponse, TBody>(
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    body?: TBody,
): Promise<TResponse> => {
    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    const data = res.status === 204 ? null : await res.json().catch(() => null)

    if (!res.ok) {
        throw new ApiError(res.status, data)
    }

    return data as TResponse
}

export const postFetcher = async <TResponse, TBody>(
    url: string,
    { arg }: { arg: TBody },
): Promise<TResponse> => request<TResponse, TBody>("POST", url, arg)

export const putFetcher = async <TResponse, TBody>(
    url: string,
    { arg }: { arg: TBody },
): Promise<TResponse> => request<TResponse, TBody>("PUT", url, arg)

export const patchFetcher = async <TResponse, TBody>(
    url: string,
    { arg }: { arg: TBody },
): Promise<TResponse> => request<TResponse, TBody>("PATCH", url, arg)

export const deleteFetcher = async <TResponse>(
    url: string,
): Promise<TResponse> => request<TResponse, undefined>("DELETE", url)
