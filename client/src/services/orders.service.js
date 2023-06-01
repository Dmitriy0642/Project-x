import http from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "/order";
const orderService = {
  getPurchasedProd: async () => {
    const { data } = await http.get(
      `${userEndPoint}/${localStorageService.getUserId()}/
        purchasedItem`
    );
    return data;
  },
  getPurchasedProdQuantity: async (item) => {
    const { data } = await http.get(
      `${userEndPoint}/${localStorageService.getUserId()}/purchasedItem/${
        item._id
      }/quantity`
    );
    return data;
  },
  createPurchasedProduct: async (prod, dataForm) => {
    const { data } = await http.patch(
      `${userEndPoint}/${localStorageService.getUserId()}/purchasedItem/${
        prod._id
      }`,
      {
        fio: dataForm.fio,
        addres: dataForm.addres,
        numtel: dataForm.numtel,
        post: dataForm.post,
        sity: dataForm.sity,
        purchasedItem: [
          {
            _id: prod._id,
            category: prod.category,
            firm: prod.firm,
            name: prod.name,
            price: prod.price,
            quantity: [...prod.quantity],
          },
        ],
      }
    );
    return data;
  },
};
export default orderService;
