import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './residents.scss'
import { FreeMode, Pagination } from 'swiper/modules';
import r1 from '../../public/assets/photo/r1.png'
import r2 from '../../public/assets/photo/r2.png'
import r3 from '../../public/assets/photo/r3.png'
const Residents = () => {
  return (
    <main>
      <section className="residents">
        <div className="container">
          <div className="about__top-wrap">
            <h2 className="about__title">
              РЕЗИДЕНТЫ ИНДУСТРИАЛЬНОГО ПАРКА “SILK WAY”
            </h2>
          </div>
          <div className="residents__content">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="residents__box">
                  <img src={r1} alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="residents__box">
                  <img src={r2} alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="residents__box">
                  <img src={r3} alt="" />
                </div>
              </SwiperSlide>  <SwiperSlide>
                <div className="residents__box">
                  <img src={r1} alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="residents__box">
                  <img src={r2} alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="residents__box">
                  <img src={r3} alt="" />
                </div>
              </SwiperSlide>

            </Swiper>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Residents