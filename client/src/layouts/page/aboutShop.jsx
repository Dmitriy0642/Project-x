import React from "react";
import styles from "../layouts.styles/aboutShop.module.css"
import Slider from "../../common/slider";

const AboutShop = () => {

    const slides = ["https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_540,c_limit/7ae21c26-38b0-4356-8d39-c528d3c8e184/nike-just-do-it.jpg","https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_540,c_limit/848342cf-4d8a-4d8e-8070-4634fc37726a/nike-just-do-it.jpg", "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_540,c_limit/f123f0cc-0bdd-4233-8e43-9d38127158c3/nike-just-do-it.jpg"]
return (
    <div className={styles.main_div}>
        <Slider sliders={slides}/>
    </div>  
    
)
}
export default AboutShop