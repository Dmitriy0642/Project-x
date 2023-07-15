import React, { useEffect, useState } from "react";
import styles from "../layouts.styles/aboutShop.module.css"
import Slider from "../../common/slider";
import sliderService from "../../services/slides.service";
const AboutShop = () => {

    const [currentImage,setCurrentImage] = useState()
    const data = sliderService.getList()


useEffect(()=>{
   data.then((res)=>{
        setCurrentImage(res[0].image)
   })
},[])


    
return currentImage === null ? (<h1>Loading...</h1>):(
    <div className={styles.main_div}>
        <Slider sliders={currentImage}/>
    </div>  
    )
}
export default AboutShop