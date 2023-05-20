const Product = require("../models/Product.js");
const Category = require("../models/Category.js");

const productMock = require("../mock/product.json");
const categoryMock = require("../mock/category.json");

module.exports = async () => {
  const products = await Product.find();
  if (products.length !== Object.keys(productMock).length) {
    await createInitialEntity(Product, productMock);
  }

  const categorys = await Category.find();
  if (categorys.length !== Object.keys(categoryMock).length) {
    await createInitialEntityCategory(Category, categoryMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    Object.keys(data).map(async (item) => {
      try {
        delete data[item]._id;
        const newItem = Model(data[item]);
        await newItem.save();
        return item;
      } catch (e) {
        return e;
      }
    })
  );
}

async function createInitialEntityCategory(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    Object.keys(data).map(async (item) => {
      try {
        const newData = { _id: data[item]._id, name: data[item].name };
        const newItem = Model(newData);
        await newItem.save();
        return newData;
      } catch (e) {
        return e;
      }
    })
  );
}
