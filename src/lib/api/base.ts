import { ApiResult, ApiError } from './types';

export async function handleApiResponse<T>(promise: Promise<any>): Promise<ApiResult<T>> {
  try {
    const response = await promise;
    
    if (response.error) {
      throw new ApiError(
        response.error.message || 'An unexpected error occurred',
        response.error.status
      );
    }

    if (!response.data) {
      return {
        data: null,
        error: {
          message: 'No data received from server',
          status: 404
        }
      };
    }

    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        data: null,
        error: {
          message: error.message,
          status: error.status
        }
      };
    }

    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 500
      }
    };
  }
}