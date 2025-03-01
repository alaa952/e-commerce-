import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios';
import Slider from "react-slick";
export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [categriesProduct, setcategriesProduct] = useState(null)
  async function getcategries(){
    let{data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    // console.log(data.data);
    setcategriesProduct(data.data);
  }
 useEffect(()=>{
  getcategries();
 },[])
  return (
    <>
    
    <div className="containerpy-12 my-5">
    <Slider {...settings}>
    {categriesProduct?.map((catg)=> <div key={catg._id}>
        <img src={catg.image} className='h-72' alt="categries" />
        <h6>{catg.name}</h6>
      </div>)}
    </Slider>
    </div>
    </>
  )
}
