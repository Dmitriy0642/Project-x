const filterOnCategoryToProduct = (data, nameOfCategory) => {
  const product = data.prod;
  const firm = data.firmCategory;

  const filterOnProduct = product.filter((arr) => {
    const filterOnCategory = firm.find((obj) => obj._id === arr.category);
    if (filterOnCategory !== undefined) {
      const filter_name = filterOnCategory.name;
      if (filter_name === `${nameOfCategory}`) return arr;
    }
  });
  return filterOnProduct;
};

export default filterOnCategoryToProduct;
