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
    isCapitalLength: {
      message: "Длинна номера ,должна быть не меньше 8 символов",
    },
  },
  passwordagain: {
    isRequired: { message: "Пароль ,обязателен для заполнения" },
    isCapitalSymbol: { message: "Пароль должен содержать заглавную букву" },
    isCapitalLength: {
      message: "Длинна пароля должна быть больше 8 символов",
    },
    isCapitalValidationPass: { message: "Пароли не совпадают " },
  },
  sity: {
    isRequired: { message: "Город обязателен для заполнения" },
  },
  address: {
    isRequired: {
      message: "Адресс обязателен для заполнения",
    },
  },
  firm: {
    isRequired: {
      message: "Фирма обязательна для заполнения",
    },
  },
  price: {
    isRequired: {
      message: "Цена обязательна для заполнения",
    },
  },
  category: {
    isRequired: {
      message: "Выберите категорию товара",
    },
  },
  img: {
    isRequired: {
      message: "Необходимо добавить фото в формате ссылки",
    },
  },
  name: {
    isRequired: {
      message: "Название товара обязателен для заполнения",
    },
  },
  _id: {
    isRequired: {
      message: "Идентификатор товара обязателен для заполнения",
    },
  },
  product: {
    isRequired: {
      message: "Продукт обязателен для заполнения",
    },
  },
  size: {
    isRequired: {
      message: "Размер обязателен к заполнению",
    },
  },
  size1: {
    isRequired: {
      message: "Размер обязателен к заполнению",
    },
  },
  size2: {
    isRequired: {
      message: "Размер обязателен к заполнению",
    },
  },
  size3: {
    isRequired: {
      message: "Размер обязателен к заполнению",
    },
  },
  value: {
    isRequired: {
      message: "Количество товара обязательно к заполнению",
    },
  },
  value1: {
    isRequired: {
      message: "Количество товара обязательно к заполнению",
    },
  },
  value2: {
    isRequired: {
      message: "Количество товара обязательно к заполнению",
    },
  },
  value3: {
    isRequired: {
      message: "Количество товара обязательно к заполнению",
    },
  },
};
export default validatorConfig;