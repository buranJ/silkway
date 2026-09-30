import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import "./hero.scss"
import { NavLink } from 'react-router-dom'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Hero = () => {
    return (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper hero-container">
            <SwiperSlide>
                <section className='hero'>
                    <div className="hero__container">
                        <div className="hero__content">
                            <div className="hero__wrap">
                                <h1 className="hero__title">
                                    ВПЕРВЫЕ В КЫРГЫЗСТАНЕ
                                    ИНДУСТРИАЛЬНЫЙ ПАРК
                                </h1>
                                <h2 className="hero__way">Silk Way</h2>
                            </div>
                            <div className="hero__bottom">
                                <h3>ТОРГОВЫЙ КОМПЛЕКС</h3>
                                <NavLink className="hero__btn" to="/industrial">Подробнее</NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            <SwiperSlide>
                <section className='hero'>
                    <div className="hero__container">
                        <div className="hero__content">
                            <div className="hero__wrap">
                                <h1 className="hero__title">
                                    ВПЕРВЫЕ В КЫРГЫЗСТАНЕ
                                    ИНДУСТРИАЛЬНЫЙ ПАРК
                                </h1>
                                <h2 className="hero__way">Silk Way</h2>
                            </div>
                            <div className="hero__bottom">
                                <h3>Тканевый комплекс</h3>
                                <NavLink className="hero__btn" to="/textile">Подробнее</NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            <SwiperSlide>
                <section className='hero'>
                    <div className="hero__container">
                        <div className="hero__content">
                            <div className="hero__wrap">
                                <h1 className="hero__title">
                                    ВПЕРВЫЕ В КЫРГЫЗСТАНЕ
                                    ИНДУСТРИАЛЬНЫЙ ПАРК
                                </h1>
                                <h2 className="hero__way">Silk Way</h2>
                            </div>
                            <div className="hero__bottom">
                                <h3>Промышленный комплекс</h3>
                                <NavLink className="hero__btn" to="/residential">Подробнее</NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            <SwiperSlide>
                <section className='hero'>
                    <div className="hero__container">
                        <div className="hero__content">
                            <div className="hero__wrap">
                                <h1 className="hero__title">
                                    ВПЕРВЫЕ В КЫРГЫЗСТАНЕ
                                    ИНДУСТРИАЛЬНЫЙ ПАРК
                                </h1>
                                <h2 className="hero__way">Silk Way</h2>
                            </div>
                            <div className="hero__bottom">
                                <h3>Жилой комплекс</h3>
                                <NavLink className="hero__btn" to="/residents">Подробнее</NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </SwiperSlide>

        </Swiper>

    )
}

export default Hero