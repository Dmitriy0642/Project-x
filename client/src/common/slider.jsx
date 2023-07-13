import React, { useState } from "react";
import styles from "./styles.common/slider.module.css"
const Slider = ({sliders}) => {
    const [currentIndexSlide,setCurrentIndexSlide] = useState(0)

    return (
        <div className={styles.main_div}>
            {sliders.map((item)=>(
                <img src={item} key={item} className={styles.main_img}/>
            ))}
        </div>
    )
}

export default Slider