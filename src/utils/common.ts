import { Codes } from "./AppConstants";


export const inputValidation = async (input, rules) => {
    const niv = require('node-input-validator');
    const validate = new niv.Validator(input, rules);
    const matched = await validate.check();
    if (!matched) {
        return customizeValidationMessage(validate.errors);
    }
    return "";
};

export const customizeValidationMessage = (errors) => {
    return {
        code: Codes.validation,
        status: false,
        message: errors[Object.keys(errors)[0]].message
    };
};
