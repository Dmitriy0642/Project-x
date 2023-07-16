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
    <div className={styles.container}>
        <div className={styles.first_block_text}>
            <div className={styles.first_text_under_block}>
                <h2 className={styles.first_text}>Hello everyone, who visited this site.Here you can find ,stylish clothes , at good price .You are can make sure , in this .Our clients writing we, more 100 positive review, of all world,because they are satisfied us service.</h2>
            </div>
            <div className={styles.second_text_underblock}>
                <h2 className={styles.text}>In us colletion include , Stone Island most popular brand .We are cooperate with it brand , who give us , more rare colletiotions , and good prices .You are find it , from us site, also you can see ,most popular brand Nike .This shop , specialize on rare , and most popular model shoes .</h2>
            </div>
        </div>
        <div className={styles.main_div}>
            <Slider sliders={currentImage}/>
        </div>
    </div>  
    )
}
export default AboutShop