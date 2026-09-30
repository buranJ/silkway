import React from 'react'
import './comfort.scss'
import logoWhite from '../../public/logo-white.png'
import paternWhite from '../../public/assets/icon/patern-white.png'
import comfort1 from '../../public/assets/photo/comf-1.png'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const Comfort = () => {
    return (
        <section className="comfort">
            <div className="container">
                <div className="comfort__wrap">
                    <div className="comfort__top">
                        <img src={logoWhite} alt="logo-white" />
                        <img src={paternWhite} alt="patern" />
                    </div>

                </div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide>
                        <div className="comfort__content">
                            <div className="comfort__test">
                                <h2 className="comfort__title">МЕД ЦЕНТР
                                    “SILK WAY”</h2>
                                <p className="comfort__description">
                                    Индустриальный парк создает удобства для своих резидентов и готовит следующую инфраструктуру:
                                </p>
                            </div>
                            <div className="comfort__img">
                                <img src={comfort1} alt="" />
                            </div>
                        </div></SwiperSlide>
                    <SwiperSlide> <div className="comfort__content">
                        <div className="comfort__test">
                            <h2 className="comfort__title">МЕД ЦЕНТР
                                “SILK WAY”</h2>
                            <p className="comfort__description">
                                Индустриальный парк создает удобства для своих резидентов и готовит следующую инфраструктуру:
                            </p>
                        </div>
                        <div className="comfort__img">
                            <img src={comfort1} alt="" />
                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide> <div className="comfort__content">
                        <div className="comfort__test">
                            <h2 className="comfort__title">МЕД ЦЕНТР
                                “SILK WAY”</h2>
                            <p className="comfort__description">
                                Индустриальный парк создает удобства для своих резидентов и готовит следующую инфраструктуру:
                            </p>
                        </div>
                        <div className="comfort__img">
                            <img src={comfort1} alt="" />
                        </div>
                    </div></SwiperSlide>
               
                </Swiper>

            </div>
        </section>
    )
}

export default Comfort