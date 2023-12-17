export const limitTextToMax = (arg: string, maxCharacters: number) => {
    return arg.length > maxCharacters ? `${arg.slice(0, maxCharacters)}...` : arg
}

export const getSortedKey = (arg1: string, arg2: string) => {
    return [arg1, arg2].sort().join('');
}

export const initialNumberOfConversations = 10;

export const initialNumberOfMessages = 15;