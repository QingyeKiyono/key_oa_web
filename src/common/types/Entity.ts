// 员工实体的类型定义
interface Employee {
  id: Number;
  name: String;
  gender: Boolean;
  jobNumber: String;
  phone: String;
  email: String;
  identity: String;
  birthday: Date;
  password: String;
  verified: Boolean;
  roles?: Set<Role>;
}

// 角色的类型定义
interface Role {
  id: Number;
  name: String;
  active: Boolean;
  parent?: Role;
  children?: Set<Role>;
  employees?: Set<Employee>;
  permissions?: Set<Permission>;
  pageRes?: Set<PageRes>;
}

// 权限的类型定义
interface Permission {
  id: Number;
  value: String;
  description: String;
  parent?: Permission;
  children?: Set<Permission>;
  roles?: Set<Role>;
}

// 页面资源的类型定义
interface PageRes {
  id: Number;
  url: String;
  description: String;
  icon: String;
  pageGroup: Boolean;
  parent?: PageRes;
  children?: Set<PageRes>;
  roles?: Set<Role>;
}

export { type Employee, type PageRes };
