import React from 'react'
import logoWhite from '../../public/logo-white.png'
import paternWhite from '../../public/assets/icon/patern-white.png'
import project1 from '../../public/assets/photo/project1.png'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import './projects.scss'
const Projects = () => {
    return (
        <section className='projects'>
            <div className="container">
                <div className="projects__wrap">
                    <div className="projects__top">
                        <img src={logoWhite} alt="logo" />
                        <img src={paternWhite} alt="patern" />
                    </div>
                    <div className="projects__content">
                        <div className="projects__text">
                            <p className="projects__description">Наш большой проект нацелен на помощь малому и среднему бизнесу и через создание кластера со всеми удобствами дать им возможность расширить собственное производство.
                            </p>
                            <p className="projects__description">Таким образом, это поможет многим отраслям экономики Кыргызстана, в том числе и легкой промышленности, выйти на мировые рынки. Другими словами, индустриальный парк «SILK WAY» станет одной из точек роста бизнес-мощи республики и превратится в деловой и индустриальный центр региона</p>
                        </div>
                        <div className="projects__photo">
                            <Swiper
                                pagination={{
                                    type: 'fraction',
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <img src={project1} alt="projects" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={project1} alt="projects" /></SwiperSlide>
                                <SwiperSlide>
                                    <img src={project1} alt="projects" /></SwiperSlide>
                                <SwiperSlide>
                                    <img src={project1} alt="projects" /></SwiperSlide>
                                <SwiperSlide>
                                    <img src={project1} alt="projects" /></SwiperSlide>
                            </Swiper>


                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Projects