
import { HttpException } from "./HttpException";

export class ValidationException extends HttpException {

  constructor(public message: string, public data: any = null) {
    super(412, message, data);
  }
}
