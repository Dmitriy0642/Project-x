const filtredSoloData = (data, id) => {
  if (data !== undefined) {
    const getSingleData = data.find((obj) => obj._id === id);
    const readyData = [];
    readyData.push(getSingleData);
    return readyData;
  }
};

export default filtredSoloData;
