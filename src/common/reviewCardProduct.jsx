import filterOnCategoryToProduct from "../functions/filterOnCategoryToProduct";
import filtredSoloData from "../functions/filterSingleDataForSingleVieving";
import styles from "../common/styles.common/reviewCardProduct.module.css";
import ReviewCardForm from "./reviewCardForm";
import { getProduct } from "../store/product";
import { useSelector } from "react-redux";
import { getCategory } from "../store/categoryOfProduct";

const ReviewCardProduct = ({ match }) => {
  const product = useSelector(getProduct());
  const firm = useSelector(getCategory());

  const name = match.params.name;
  const id = match.params.postId;
  const arrOfCategory = filterOnCategoryToProduct(product, `${name}`, firm);
  const singleData = filtredSoloData(arrOfCategory, id);

  return singleData === undefined ? (
    <h1>Lodaing...</h1>
  ) : (
    <div className={styles.main_div}>
      {singleData.map((item) => (
        <div className={styles.wrapper} key={item._id}>
          <img src={item.img[0]} className={styles.img_product}></img>
          <ReviewCardForm
            obj={singleData}
            name={item.name}
            _id={item._id}
            price={item.price}
            quantity={item.quantity}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewCardProduct;
