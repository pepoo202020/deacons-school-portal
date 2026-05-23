// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ActionResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export const createSuccessResponse = <T>(
  message: string,
  data?: T,
  code: number = 200,
): ActionResponse<T> => {
  return {
    code,
    success: true,
    message,
    data,
  };
};

export const createErrorResponse = (
  message: string,
  errors?: Record<string, string[]>,
  code: number = 400,
): ActionResponse<null> => {
  return {
    code,
    success: false,
    message,
    errors,
  };
};
