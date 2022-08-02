type Validator = (value: string) => boolean;

const phoneRegex =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

const phone: Validator = (value) => {
  return phoneRegex.test(value);
};

const identityRegex =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

const identity: Validator = (value) => {
  return identityRegex.test(value);
};

export { phone, identity };
