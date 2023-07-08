import React from "react";
import styles from "../layouts.styles/filter.module.css"
import { useSelector } from "react-redux";
import { getCategory } from "../../store/categoryOfProduct";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const ReviewForm = ({data,quantity,id}) => {
const history = useHistory()
const categ = useSelector(getCategory())



const onClick = (e) => {
    const findName = categ.find((c)=>c._id === e.target.id)
    history.push(`${findName.name}/${e.target.name}`)
}

return(
   <div key={id} className={styles.product_div}>
            <img src={data.img[0]} className={styles.img_card} onClick={onClick} id={data.category} name={data._id}/>
        <div className={styles.card_product}>
            <h2 className={styles.title}>Name product :{data.name}</h2>
            <h2 className={styles.title}>Price : {data.price}</h2>
            <h2 className={styles.title}>Aviable size</h2>
            {quantity.map((item)=>(
                <div className={styles.div_buttons} key={item.size}>
                <span className={styles.span_button}>{item.size}({item.value})</span>
                </div>
            ))}
        </div>
   </div>
)

}

export default ReviewForm