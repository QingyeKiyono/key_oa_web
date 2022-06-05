interface JsonResponse<T = any> {
  code: String;
  message: String;
  data: T;
}

interface Employee {
  id: Number;
  name: String;
  jobNumber: String;
  phone: String;
  email: String;
  identity: String;
  birthday: Date;
  password: String;
  verified: Boolean;
}

export { type Employee, type JsonResponse };
