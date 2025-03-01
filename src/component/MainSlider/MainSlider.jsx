import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick"; 
import img1 from "../../assets/images/slider-image-3.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-2.jpeg";  
import img4 from "../../assets/images/grocery-banner.png";
import img5 from "../../assets/images/grocery-banner-2.jpeg";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows :false,
  };
  const [count, setcount] = useState(0)
 useEffect(()=>{

 })
  return (
    <>
      <div className="container ">
          <div className="flex">
          <div className="w-3/4">
           <Slider {...settings}> 
             <img src={img1} className='w-screen h-[300px]' alt=" Chocolete" />
             <img src={img2} className='w-screen h-[300px]' alt=" Chocolete" />
             <img src={img3} className='w-screen h-[300px]' alt=" Chocolete" />
           </Slider>
           </div>
           <div className="w-1/4">
           <img src={img4} className='w-screen h-[150px]' alt=" Chocolete" />
           <img src={img5} className='w-screen h-[150px]' alt=" Chocolete" />
           </div>
          </div>
      </div>
    </>
  )
}
