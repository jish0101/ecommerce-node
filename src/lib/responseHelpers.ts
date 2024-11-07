type ResponseT<T> = {
  status: number;
  data?: T | T[];
  message?: string;
  stack?: any;
};

export function createResponse<T>(
  status: number,
  data?: T | T[],
  message?: string,
  stack?: any,
): ResponseT<T> {
  return {
    status,
    message,
    data,
    stack,
  };
}
