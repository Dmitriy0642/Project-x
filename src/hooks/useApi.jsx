import axios from "axios";
import { useEffect } from "react";

const UseApi = () => {
  const getDataInDb =
    "https://my-project-b2b2a-default-rtdb.europe-west1.firebasedatabase.app.json";
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(getDataInDb);
      console.log(data);
    };
    getData();
  }, []);
};

export default UseApi;
