import { CustomError } from "../utils/customError";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serialize(): { message: string } {
    return { message: this.message };
  }
}
