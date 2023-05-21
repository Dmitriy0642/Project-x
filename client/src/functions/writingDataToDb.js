import orderService from "../services/orders.service";
import productSerivce from "../services/product.service";
import decrementPurchased from "./decrementPurchased";
const writingDataToDb = async (dataForm, dataFromBascet) => {
  console.log(dataForm, dataFromBascet);
};

export default writingDataToDb;
