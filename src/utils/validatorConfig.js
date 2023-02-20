const validatorConfig = {
  email: {
    isRequired: { message: "Email ,обязателен для заполнения" },
    isEmail: { message: "Email введен не корректно" },
  },
  password: {
    isRequired: { message: "Пароль ,обязателен для заполнения" },
    isCapitalSymbol: { message: "Пароль должен содержать заглавную букву" },
    isCapitalLength: {
      message: "Длинна пароля должна быть больше 8 символов",
    },
  },
  fio: {
    isRequired: { message: "ФИО Обязательно для заполнения" },
  },
  numtel: {
    isRequired: { message: "Телефон обязателен для заполнения" },
    isNumTel: { message: "Введите только цифры" },
  },
  passwordagain: {
    isRequired: { message: "Пароль ,обязателен для заполнения" },
    isCapitalSymbol: { message: "Пароль должен содержать заглавную букву" },
    isCapitalLength: {
      message: "Длинна пароля должна быть больше 8 символов",
    },
    isCapitalValidationPass: { message: "Пароли не совпадают " },
  },
};
export default validatorConfig;
