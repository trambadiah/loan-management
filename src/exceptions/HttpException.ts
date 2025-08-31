export class HttpException extends Error {


  constructor(public status: number, public message: string, public data: any = null) {
    super(message);
    console.log(status, message);
  }
}
