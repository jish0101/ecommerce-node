type ResponseT<T> = {
  status: number;
  data?: T | T[];
  message?: string;
  details?: any;
  stack?: any;
};

export function createResponse<T>(
  status: number,
  data?: T | T[],
  message?: string,
  details?: any,
  stack?: any,
): ResponseT<T> {
  let res: ResponseT<T> = {
    status,
    message,
  };
  if (data) {
    res.data = data;
  }
  if (details) {
    res.details = details;
  }
  if (stack) {
    res.stack = stack;
  }
  return res;
}
