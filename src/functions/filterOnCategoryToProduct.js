const filterOnCategoryToProduct = (data, nameOfCategory, firm) => {
  const filterOnProduct = data.filter((arr) => {
    const filterOnCategory = firm.find((obj) => obj._id === arr.category);
    if (filterOnCategory !== undefined) {
      const filter_name = filterOnCategory.name;
      if (filter_name === `${nameOfCategory}`) return arr;
    }
  });
  return filterOnProduct;
};

export default filterOnCategoryToProduct;
