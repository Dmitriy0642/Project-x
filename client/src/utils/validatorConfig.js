const validatorConfig = {
  email: {
    isRequired: { message: "Email required" },
    isEmail: { message: "Email is wrong" },
  },
  password: {
    isRequired: { message: "Password required" },
    isCapitalSymbol: { message: "Password must have one uppercase letter" },
    isCapitalLength: {
      message: "Length password must be more 8 symbols",
    },
  },
  fio: {
    isRequired: { message: "FIO required" },
  },
  numtel: {
    isRequired: { message: "Num phone required" },
    isNumTel: { message: "Input only numbers" },
    isCapitalLength: {
      message: "Length numtel must be more 8 symbols",
    },
  },
  passwordagain: {
    isRequired: { message: "Password required" },
    isCapitalSymbol: { message: "Password must have one uppercase letter" },
    isCapitalLength: {
      message: "Length password must be more 8 symbols",
    },
    isCapitalValidationPass: { message: "password not match " },
  },
  sity: {
    isRequired: { message: "City required" },
  },
  address: {
    isRequired: {
      message: "Adress required",
    },
  },
  firm: {
    isRequired: {
      message: "Firm required",
    },
  },
  price: {
    isRequired: {
      message: "Price required",
    },
  },
  category: {
    isRequired: {
      message: "Select category product",
    },
  },
  img: {
    isRequired: {
      message: "Photo in format links",
    },
  },
  name: {
    isRequired: {
      message: "Name of product required",
    },
  },
  _id: {
    isRequired: {
      message: "Id required",
    },
  },
  product: {
    isRequired: {
      message: "Product required",
    },
  },
  size: {
    isRequired: {
      message: "Size required",
    },
  },
  size1: {
    isRequired: {
      message: "Size required",
    },
  },
  size2: {
    isRequired: {
      message: "Size required",
    },
  },
  size3: {
    isRequired: {
      message: "Size required",
    },
  },
  value: {
    isRequired: {
      message: "Count of product required",
    },
  },
  value1: {
    isRequired: {
      message: "Count of product required",
    },
  },
  value2: {
    isRequired: {
      message: "Count of product required",
    },
  },
  value3: {
    isRequired: {
      message: "Count of product required",
    },
  },
};
export default validatorConfig;
