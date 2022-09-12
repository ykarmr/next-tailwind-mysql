import { BaseError } from "./base-error"

export class IoTsValidation<T> extends BaseError {
    
    constructor(message?: string, private item?: T){
        super(message)
        this.name = 'IoTsValidationError'
    }    
}