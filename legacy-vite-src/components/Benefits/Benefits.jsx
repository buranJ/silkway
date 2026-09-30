import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './benefits.scss'

// import required modules
import { Navigation } from 'swiper/modules';

const Benefits = () => {
    return (
        <section className='benefits'>
            <div className="container">
                <div className="benefits__top">
                    <h2 className="benefits__title">
                        Наши преимущества
                    </h2>
                    <p className="benefits__description">
                        У нас созданы все условия по международным стандартам для ведения бизнеса:
                    </p>
                </div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide>
                        <div className="benefits__content">
                            <div className="benefits__wrap">
                                <div className="benefits__null"></div>
                                <div className="benefits__text">
                                    <p className="benefits__list">
                                        Удачное географическое расположение —
                                        на пересечении международных автодорог А365
                                        (Бишкек — Нарын — Торугарт) и М39
                                        (связывает Кыргызстан, Казахстан и Узбекистан)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="benefits__content">
                            <div className="benefits__wrap">
                                <div className="benefits__null"></div>
                                <div className="benefits__text">
                                    <p className="benefits__list">
                                        Удачное географическое расположение —
                                        на пересечении международных автодорог А365
                                        (Бишкек — Нарын — Торугарт) и М39
                                        (связывает Кыргызстан, Казахстан и Узбекистан)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="benefits__content">
                            <div className="benefits__wrap">
                                <div className="benefits__null"></div>
                                <div className="benefits__text">
                                    <p className="benefits__list">
                                        Удачное географическое расположение —
                                        на пересечении международных автодорог А365
                                        (Бишкек — Нарын — Торугарт) и М39
                                        (связывает Кыргызстан, Казахстан и Узбекистан)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default Benefits