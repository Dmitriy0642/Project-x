import React, { useEffect, useState } from "react";
import styles from "../layouts.styles/aboutShop.module.css"
import Slider from "../../common/slider";
import sliderService from "../../services/slides.service";
import { Link } from "react-router-dom";
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
        <div className={styles.line}>
        </div>
        <div className={styles.first_block}>
            {currentImage === undefined ? <h2>Loading</h2>:<img src={currentImage[1]} alt="" />}
            <h1 className={styles.main_text}>You are visit web site, CompassShop</h1>
                    <li className={styles.list}>Ours clients is around 20k users</li>
                    <li>Constant discount of often clients</li>
                    <li>Delivery in Europe durning 5 days</li>
                    <Link to="/"><button className={styles.button}>Show more</button></Link>
        </div>
        <div className={styles.line}>
        </div>
        <div className={styles.second_block}>
                <h2 className={styles.main_text_second_block}>Why is it worth , use especially it shop?</h2>
                {currentImage === undefined ? <h2>Loading</h2>: <img src={currentImage[2]} alt="" className={styles.img_second_block}/>}
                    <div className={styles.under_text_second_block}>
                        <li className={styles.list}>Especially offers , at purchased from 3 things</li>
                        <li className={styles.list}>Often sale ,and especially beneficial offers exactly for you</li>
                        <li className={styles.list}>At purchased things at 1000$ free delivery , only for Europe</li>
                        <div className={styles.button_block}>
                                <Link to="/t-shirt"><button className={styles.button}>Tshirts</button></Link>
                                <Link to="/sweatshirt"><button className={styles.button}>Hoodie</button></Link>
                                <Link to="/boots"><button className={styles.button}>Shoes</button></Link>
                        </div>
                    </div>
        </div>
        <div className={styles.line}>
        </div>
        <div className={styles.main_div}>
            {/* <Slider sliders={currentImage}/> */}
        </div>
    </div>  
    )
}
export default AboutShop