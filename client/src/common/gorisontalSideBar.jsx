import React, { useEffect, useState } from "react";
import styles from "./styles.common/sideBar.module.css"
import { Link } from "react-router-dom";


const SideBar = ({allCatalog,usedId, url,id}) => {
    const [allDataFromCatgegory,setAllDataFromCategory] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    useEffect(()=>{
        setAllDataFromCategory(allCatalog)
        setSelectedItem(usedId)
    },[allCatalog])
   
    


    
    return allDataFromCatgegory===null?(<h1>Loading</h1>):(
    <div className={styles.wrapper}>
        {allDataFromCatgegory.map((item)=>(
            <div className={styles.card} key={item._id} >
                <Link to={`/${url}/${item._id}`}>
                    {<img src={item.img[0]}  id={item._id} />}
                </Link>
            </div>
        ))}
    </div>
)
}


export default SideBar