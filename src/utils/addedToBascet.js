const addedToBascet = (object, initialSize) => {
  const allData = localStorage.getItem("AllData");
  const parseData = JSON.parse(allData);

  const getItemElemntById = parseData.filter((item) => item._id === object._id);
  const receivedSingleData = getItemElemntById[0];

  const newQuantity = receivedSingleData.quantity.map((item) => {
    if (item.size === initialSize) {
      return { ...item, value: (item.value += 1) };
    }
    return item;
  });
  console.log(newQuantity);
};

export default addedToBascet;
