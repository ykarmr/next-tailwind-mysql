export class BaseError extends Error {
    public errorDetail?: object | string
    constructor(message?: string){
        super(message)
    }
}