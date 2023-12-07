export const limitTextToMax = (arg: string, maxCharacters: number) => {
    return arg.length > maxCharacters ? `${arg.slice(0, maxCharacters)}...` : arg
}