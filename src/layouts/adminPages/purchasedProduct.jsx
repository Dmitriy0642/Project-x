import React, { useEffect, useState } from "react";
import productSerivce from "../../services/product.service";
const PurchasedProduct = () => {
  const [salesProduct, setSalesProduct] = useState();

  useEffect(() => {
    productSerivce.getSalesProduct().then((res) => {
      setSalesProduct(res);
    });
  }, []);

  console.log(salesProduct);

  return <h1>PurchasedPrdouct</h1>;
};

export default PurchasedProduct;
