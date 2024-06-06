export const UNAVAILABLE_ERROR = 'Service Temporarily Unavailable. Please try again later.';

/**
 * Returns the first instance of readable error string
 * @param error Any error object or message
 */
export function getReadableError(error: any): string {
    if (isString(error)) {
        return error;
    }
    const message = getFirstStringFromKey(error, 'message');
    if (message.startsWith('Unexpected token')) {
        return UNAVAILABLE_ERROR;
    }
    return message;
}

export function findAllNumbers(message: string): string[] {
    const regexp = /\d+\.?\d*/g;
    const matched = [...message.matchAll(regexp)];
    return matched.map((regexpItem) => regexpItem[0]);
}

function isString(item: any): boolean {
    return typeof item === 'string';
}

// gets first string value from key if specified, else just gets first string value
export function getFirstStringFromKey(item?: any, key?: string): string {
    if (!item) {
        return '';
    }
    if (typeof item === 'string') {
        return key ? '' : item;
    }
    if (Array.isArray(item)) {
        return item?.join('; ');
    }
    if (typeof item === 'object') {
        if (key) {
            if (item[key] && typeof item[key] === 'string') {
                return item[key];
            }
        }
        const firstStringChild = Object.values(item)
            .map((innerkey) => getFirstStringFromKey(innerkey, key))
            .filter((child) => child !== '');
        if (firstStringChild.length > 0) {
            return firstStringChild[0];
        }
    }

    // dead end - not an object or a string
    return '';
}
