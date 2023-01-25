import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import filterOnCategoryToProduct from "../utils/filterOnCategoryToProduct";
import filtredSoloData from "../utils/filterSingleDataForSingleVieving";
const ReviewCardProduct = ({ match }) => {
  const [allCategoryData, setAllCategoryData] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const data = useApi();
  const name = match.params.name;
  const id = match.params.postId;

  useEffect(() => {
    setAllCategoryData(filterOnCategoryToProduct(data, `${name}`));
    if (allCategoryData !== null) {
      setSingleData(filtredSoloData(allCategoryData, id));
    }
  }, []);
  console.log(singleData);
  return singleData !== null ? <div></div> : <h2>Lodaing</h2>;
};

export default ReviewCardProduct;
