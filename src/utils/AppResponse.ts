import { ResponseModel } from "../models/CommonModels"
import { Codes } from "./AppConstants"

export class AppResponse {



    static sendSuccess(code, message = 'Success', data): ResponseModel {
        return {
            codes: code,
            data: data,
            message: message,
        }
    }

    static sendError(code, message = 'Error', errorCodes): ResponseModel {
        return {
            codes: code,    
            message: message,
            data: {}
        }
    }

    static sendNotFound(message, data = {}): ResponseModel {
        return {
            data: data,
            codes: Codes.not_found,
            message: message
        }
    }

    static sendNoContent(message, data = {}): ResponseModel {
        return {
            data: data,
            codes: Codes.no_content,
            message: message
        }
    }

    static sendUnauthorized(message, data = {}): ResponseModel {
        return {
            data: data,
            codes: Codes.unauthorized,
            message: message
        }
    }

    static sendValidation(message, data = {}): ResponseModel {
        return {
            data: data,
            codes: Codes.validation,
            message: message
        }
    }

    static send(status, message, data = {}): ResponseModel {
        return {
            data: data,
            codes: status,
            message: message
        }
    }

}