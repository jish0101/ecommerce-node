export class CustomError extends Error {
  public statusCode: number;
  public details?: any;
  public data?: any;

  constructor(message: string, statusCode: number, data?: any, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
