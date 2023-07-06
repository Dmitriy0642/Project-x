import React, { useEffect, useState } from "react";
import styles from "../layouts.styles/filter.module.css"
import { useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import { Link } from "react-router-dom";


const Filter = () => {
    const [ search, setSeach ] = useState("")
    const [ dataQuantity , setDataQuantity ] = useState(null)
    const data = useSelector(getProduct())
    useEffect(()=>{
        if(data ){
            data.map((item)=>{
                setDataQuantity(item.quantity)
            })
        }
    },[data])
   
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
           <div key={item._id} className={styles.prdouct_card}>
                <Link>
                <img src={item.img[0]} className={styles.img_card}/>
                </Link>
                    <h2 className={styles.card_title}>Prod firm : {item.firm}</h2>
                    <h2 className={styles.card_title}>Prod name : {item.name}</h2>
                    <h2 className={styles.card_title}>Price :{item.price}$</h2>
           </div>
        ))}
    </div>
)
}


export default Filter