import React, { useRef, useState } from 'react';
import './plan.scss'
import plan1 from '../../public/assets/photo/ren1.jpg'
import plan2 from '../../public/assets/photo/ren2.jpg'
import plan3 from '../../public/assets/photo/ren3.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules';
const Plan = () => {
    return (

        <section className='plan'>

            <div className="container">
                <div className="plan__content">
                    <h2 className="plan__title">
                        ВИД СВЕРХУ (ПЛАНИРОВКА)
                    </h2>
                    <div className="plan__wrap">
                        <div className="plan__item">
                            <Swiper
                                pagination={{
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide><img src={plan1} alt="plan" /></SwiperSlide>
                                <SwiperSlide><img src={plan2} alt="plan" /></SwiperSlide>
                                <SwiperSlide><img src={plan3} alt="plan" /></SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Plan