export function seperateBySnakeOrCamelCase(value: string) : string {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}