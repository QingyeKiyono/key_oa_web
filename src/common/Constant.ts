const cookieBase = "key_oa";

// 用于记录Jwt
const token = `${cookieBase}.login`;

// 记录当前登录员工的工号
const jobNumber = `${cookieBase}.jobNumber`;

// 用于记录当前颜色主题
const theme = `${cookieBase}.theme`;

const CookieName = {
  token,
  jobNumber,
  theme,
};

export { CookieName };
