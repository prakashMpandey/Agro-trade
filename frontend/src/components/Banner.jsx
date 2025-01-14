import React from 'react';
import { useAuthStore } from '../../store/authStore';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, 
    waitForAnimate: false,
    appendDots: dots => (
      <div style={{ bottom: '-20px' }}> {/* Adjust dots position */}
        <ul style={{ margin: '0px', fontSize: '20px' }}>{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#ccc',
        }}
      />
    ),
  };

  const { user } = useAuthStore();

  return (
    <div className='slider-container p-2 m-2 shadow-white'>
      <Slider {...settings}>
        <div>
          <img
            className='w-full rounded-md  h-72'
            src="\PM-Kisan-SCHEME.jpg"
            alt="User Avatar"
          />
        </div>
        <div>
          <img
            className='w-full rounded-md object-cover h-72'
            src={user.avatar}
            alt="User Avatar"
          />
        </div>
       
      </Slider>
    </div>
  );
};

export default Banner;
