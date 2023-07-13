import filterOnCategoryToProduct from "../functions/filterOnCategoryToProduct";
import filtredSoloData from "../functions/filterSingleDataForSingleVieving";
import styles from "../common/styles.common/reviewCardProduct.module.css";
import ReviewCardForm from "./reviewCardForm";
import { getProduct } from "../store/product";
import { useSelector } from "react-redux";
import { getCategory } from "../store/categoryOfProduct";
import ChangePhoto from "./changePhoto";
import SideBar from "./gorisontalSideBar";

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
      <SideBar allCatalog={arrOfCategory} usedId={singleData} url={name} id={id}/>
      {singleData.map((item) => (
        <div className={styles.wrapper} key={item._id}>
          <ChangePhoto image={item.img} />
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
