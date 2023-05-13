const filterOnCategoryToProduct = (data, nameOfCategory, firm) => {
  if (data !== null) {
    const filterOnProduct = data.filter((arr) => {
      const filterOnCategory = firm.find((obj) => obj.id === arr.category);
      if (filterOnCategory !== undefined) {
        const filter_name = filterOnCategory.name;
        if (filter_name === `${nameOfCategory}`) return arr;
      }
    });
    return filterOnProduct;
  }
};

export default filterOnCategoryToProduct;
