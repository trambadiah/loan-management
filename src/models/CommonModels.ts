import { Codes } from "../utils/AppConstants";

export interface ResponseModel {
    data: any;
    codes: Codes;
    message: string
}