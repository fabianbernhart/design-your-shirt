export type ValidationError = {
    message: string
    statusText: string
    errors: {
        name?: string[]
        address?: string[]
    }
}
