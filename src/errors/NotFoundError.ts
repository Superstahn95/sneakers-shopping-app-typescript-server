import { CustomError } from "../utils/customError";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize(): { message: string } {
    return { message: this.message };
  }
}
