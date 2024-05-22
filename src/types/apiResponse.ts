export type ApiResponse<T> = LoadingApiResponse | SuccessApiResponse<T> | ErrorApiResponse

type LoadingApiResponse = {
  state: 'loading'
}

type SuccessApiResponse<T> = {
  state: 'success',
  data: T
}

type ErrorApiResponse = {
  state: 'error',
  message: string
}