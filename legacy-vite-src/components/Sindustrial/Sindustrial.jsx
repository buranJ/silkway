import React, { useState } from 'react';
import arrDown from '../../public/assets/icon/arrDown.png'
import { transform } from 'framer-motion';
import './sindustrial.scss'
import as1 from '../../public/assets/photo/sa-1.png'

import logoWhite from '../../public/logo-white.png'
import paternWhite from '../../public/assets/icon/patern-white.png'
import sa2 from '../../public/assets/photo/sa2.png'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
const Sindustrial = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);

    };
    return (
        <>
            <section className='about'>
                <div className="container">
                    <div className="about__top-wrap">
                        <h2 className="about__title">
                            ТОРГОВЫЙ КОМПЛЕКС
                            “SILK WAY”
                        </h2>
                    </div>
                    <div className="about__top">
                        <h2 className="about__title">
                            О комплексе
                        </h2>
                        <img onClick={handleClick} src={arrDown} alt="arr" />
                    </div>
                    <div className="about__content">
                        Торговый комплекс «Silk Way» — это первый в стране крупный торговый комплекс, который ориентирован и на оптовую, и на розничную торговлю.
                        <div className={`text-container ${isVisible ? 'visible' : ''}`}>
                            Важно подчеркнуть, что это не рынок! Торговля будет вестись в современных зданиях со всеми условиями.
                            Так что (тем самым) любой, как рядовой, так и крупный закуп товаров не станет изнуряющим испытанием.
                            <br />
                            Вы можете не беспокоится о непогоде или о зное на улице, котельные и кондиционеры обеспечат комфортные условия.
                        </div>
                        <div className="about__imge">
                            <img src={as1} alt="about" />
                        </div>
                    </div>
                </div>
            </section>
            <section className='about'>
                <div className="container">

                    <div className="about__top">
                        <h2 className="about__title">
                            О торговом комплексе «Silk Way» в цифрах:
                        </h2>
                        <img onClick={handleClick} src={arrDown} alt="arr" />
                    </div>
                    <div className="about__content">
                        Площадь — 180.000 квадратных метров;
                        <br />


                        Торговый комплекс состоит из двух этажей:
                        на 1-м этаже — 350 бутиков;
                        на 2-м этаж — 350 бутиков
                        <div className={`text-container ${isVisible ? 'visible' : ''}`}>

                            <br />
                            Общая площадь двухэтажного торгового комплекса 1 блока составляет 36 тысяч квадратных метров.

                            Все бутики надежно защищены: сотрудники охраны круглосуточно обеспечивают безопасность, а также ведется видеонаблюдение в режиме реального времени. <br />

                            Кроме того, в каждом бутике предусмотрены сплит системы кондиционирования «зима-лето» и пожарная безопасность: автоматическая пожарная система и автономные модули пожаротушения "Тунгус".

                            Созданы лучшие условия по международным стандартам, как в развитых странах. <br />

                            Для удобства работников комплекса и покупателей имеются комнаты для совершения намаза со всеми необходимыми условиями, отдельно для мужчин и женщин.

                            Торговый комплекс оснащен пятью грузовыми лифтами, а бутики на разных уровнях соединены между собой четырьмя эскалаторами. Основной вход в торговый комплекс предусмотрен с южной стороны. Кроме того, во избежание столпотворения имеется еще более десяти входов.
                        </div>

                    </div>
                </div>
            </section>
            <section className='projects'>
                <div className="container">
                    <div className="projects__wrap">
                        <div className="projects__top">
                            <img src={logoWhite} alt="logo" />
                            <img src={paternWhite} alt="patern" />
                        </div>
                        <div className="projects__content">
                            <div className="projects__text">
                                <p className="projects__description">Наш комплекс создан для того, чтобы продавец и покупатель нашли друг друга.  
                                </p>
                                <p className="projects__description">Торговый комплекс ориентирован не только на интересы бизнесменов, но и работает над комфортом покупателей, в частности имеется более 3,5 тысяч парковочных мест </p>
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
                                        <img src={sa2} alt="projects" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={sa2} alt="projects" /></SwiperSlide>
                                    <SwiperSlide>
                                        <img src={sa2} alt="projects" /></SwiperSlide>
                                    <SwiperSlide>
                                        <img src={sa2} alt="projects" /></SwiperSlide>
                                    <SwiperSlide>
                                        <img src={sa2} alt="projects" /></SwiperSlide>
                                </Swiper>


                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>

    )
}

export default Sindustrial


