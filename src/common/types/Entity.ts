// 员工实体的类型定义
interface Employee {
  id?: Number;
  name: String;
  jobNumber: String;
  phone: String;
  email: String;
  identity: String;
  birthday: Date;
  password: String;
  verified: Boolean;
}

// 路由项的类型定义
interface Page {
  id: Number;
  url: String;
  description: String;
  icon: String;
  pageGroup: Boolean;
  children: Set<Page>;
}

export { type Employee, type Page };
