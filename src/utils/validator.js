export function validator(data, config) {
  const errors = {};
  function validate(valifateMethod, data, config) {
    let statusValidate;
    switch (valifateMethod) {
      case "isRequired":
        statusValidate = data.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const passwordRegExp = /[A-Z]+/g;
        statusValidate = !passwordRegExp.test(data);
        break;
      }
      case "isCapitalLength": {
        statusValidate = data.length < 8;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const valifateMethod in config[fieldName]) {
      const error = validate(
        valifateMethod,
        data[fieldName],
        config[fieldName][valifateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
