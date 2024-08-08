export interface MongoError {
    errorResponse: {
        index: number,
        code: number,
        errmsg: string,
        keyPattern: {
            email: number
        },
        keyValue: {
            email: string
        }
    },
    index: number,
    code: number,
    keyPattern: {
        email: number
    },
    keyValue: {
        email: string
    },
    errors: {
        password: {
            name: string,
            message: string,
            properties: {
                message: string,
                type: string,
                minlength: number,
                path: string,
                value: string
            },
            kind: string,
            path: string,
            value: string
        }
    },
    _message: string,
    name: string,
    message: string
}