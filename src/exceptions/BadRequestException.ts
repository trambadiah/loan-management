
import { HttpException } from "./HttpException";

export class BadRequestException extends HttpException {

  constructor(public message: string, public data: any = null) {
    super(400, message, data);
  }
}
