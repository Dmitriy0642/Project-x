import styles from "../layouts.styles/filter.module.css"
import { useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import React, { useState } from "react";
import ReviewForm from "./reviewFilter";
const Filter = () => {
    const [ search, setSeach ] = useState("")
    const data = useSelector(getProduct())
   
   
  
return data === null ?(<h2>Loading...</h2>):(
    <div className={styles.main_div}>
        <h2 className={styles.main_title}>
            Find your liked product at name
        </h2>
        <div className={styles.input_groupe}>
            <input type="text"  placeholder="Find product" onChange={(e) => setSeach(e.target.value)}/>
        </div>
        {data.filter((item)=>{
            return search.toLowerCase() === "" ? item : item.firm.toLowerCase().includes(search) || item.name.toLowerCase().includes(search)
        }).map((item)=>(
         <ReviewForm quantity={item.quantity} id={item.id}  data={item} key={item._id} />
        ))}
    </div>
)
}


export default Filter