import React, { useEffect, useState } from "react";
import styles from "./styles.common/changePhoto.module.css"

const ChangePhoto = ({image}) => {
    const [dataImage,setDataImage] = useState(null)
    
    useEffect(()=>{
        setDataImage(image[0])
    },[image])
    
    const onClick = ({target}) => {
        const findUsedImage = image.filter((item)=>`${item}`=== `${target.id}`)
        setDataImage(findUsedImage[0])
    }

    return (
      <div className={styles.body}>
       <div className={styles.content}> 
        <div className={styles.images}>
            <img src={dataImage}></img>
        </div>
        <div className={styles.btn_sliders}>
           {image.map((item)=>(
            <span  key={item} id={item} onClick={onClick} className={`${dataImage}` !== `${item}`?styles.btn_sidebar_nonactive:styles.active_sidebar}></span>
           ))}
        </div>
       </div>
    </div>
    )
}

export default ChangePhoto