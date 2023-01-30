const addedToBascet = (object, selectedSize) => {
  const storageData = JSON.parse(localStorage.getItem("AllData"));

  ///Filtered data from storage
  const filtradeSingleData = storageData.filter(
    (item) => item._id === object._id
  );

  ///obj data
  const objData = filtradeSingleData[0];

  const initialyQuantityFromObj = object.quantity.filter(
    (item) => `${item.size}` === `${selectedSize}`
  );

  const secondQuantityFromObj = objData.quantity.filter(
    (item) => `${item.size}` === `${selectedSize}`
  );

  const newQuantity = objData.quantity.map((item) => {
    if (`${item.size}` === `${selectedSize}`) {
      if (secondQuantityFromObj[0].value < initialyQuantityFromObj[0].value) {
        return { ...item, value: (item.value += 1) };
      }
    }
    return item;
  });

  const newObj = {
    ...objData,
    quantity: newQuantity,
  };
  const newStorage = storageData.map((item) => {
    if (item._id === object._id) {
      return newObj;
    }
    return item;
  });
  localStorage.setItem("AllData", JSON.stringify(newStorage));
};
export default addedToBascet;
