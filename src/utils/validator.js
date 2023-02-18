export function validator(data, config) {
  const errors = {};
  function validate(valifateMethod, data, config) {
    switch (valifateMethod) {
      case "isRequired":
        if (data.trim() === "") return config.message;
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        if (!emailRegExp.test(data)) return config.message;
        break;
      }
      default:
        break;
    }
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
