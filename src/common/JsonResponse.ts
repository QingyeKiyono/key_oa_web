interface JsonResponse<T = any> {
  code: String;
  message: String;
  data: T;
}

export default JsonResponse;
