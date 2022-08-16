type Validation = (value: string) => boolean;

const phoneRegex =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

const phoneFunc: Validation = (value) => {
  return phoneRegex.test(value);
};

const identityRegex =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

const identityFunc: Validation = (value) => {
  return identityRegex.test(value);
};

import {
  helpers,
  required as originRequired,
  email as originEmail,
  maxLength as originMaxLength,
  minLength as originMinLength,
} from "@vuelidate/validators";

const required = helpers.withMessage("表单项不能为空！", originRequired);

const email = helpers.withMessage("需要是电子邮箱格式！", originEmail);

const phone = helpers.withMessage("不是合法的电话号码！", phoneFunc);

const identity = helpers.withMessage("不是合法的身份证号！", identityFunc);

const maxLength = (length: number) =>
  helpers.withMessage(`长度不能超过${length}！`, originMaxLength(length));

const minLength = (length: number) =>
  helpers.withMessage(`长度不能小于${length}！`, originMinLength(length));

export { phone, identity, required, email, maxLength, minLength };
