import React, { useState } from "react";
import styles from "./styles.common/slider.module.css"

const Slider = ({sliders}) => {
    const [currentIndex,setCurrentIndex] = useState(0)

    const goToPrewiouse = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? sliders.length - 1:currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide =currentIndex === sliders.length - 1
        const newIdex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIdex)
    }

     const goToSlide = (currentIndex) => {
        setCurrentIndex(currentIndex)
     }
    
    return sliders === undefined ?(<h1>Loading...</h1>) :(
        <div className={styles.main_div}>
            <div className={styles.left_arrow} onClick={goToPrewiouse}>←</div>
                <img src={sliders[currentIndex]}  className={styles.main_img}/>
            <div className={styles.right_arrow} onClick={goToNext}>→</div>
            <div className={styles.dot_container}>
            {sliders.map((item,index)=>(
                <div key={index} className={currentIndex === index ? styles.single_dot_active : styles.single_dot} onClick={()=>goToSlide(index)}></div>
            ))}
            </div>
        </div>
    )
}

export default Slider