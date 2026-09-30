import React, { useState } from 'react';
import arrDown from '../../public/assets/icon/arrDown.png'
import { transform } from 'framer-motion';
import './stextile.scss'
import ass2 from '../../public/assets/photo/sa-2.png'


import sa2 from '../../public/assets/photo/sa2.png'
import tex1 from '../../public/assets/photo/tex1.png'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
const Stextile = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);

    };
    return (
        <div className='stextile'>
            <section className='about'>
                <div className="container">
                    <div className="about__top-wrap">
                        <h2 className="about__title">
                            ТКАНЕВЫЙ КОМПЛЕКС
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
                        Тканевый комплекс «Silk Way» фактически является кластером одного из локомотивов нашей экономики — легкой промышленности.
                        <div className={`text-container ${isVisible ? 'visible' : ''}`}>

                            Он играет важную роль в обеспечении предприятий качественными и доступными материалами и фурнитурой для производства, уже давно ставшей брендом, швейной продукции Made in KG.
                            <br />
                            Кроме того, тканевый комплекс способствует развитию экономики, создавая рабочие места и привлекая инвестиции. Он также способствует увеличению объемов производства и расширению ассортимента выпускаемой продукции.
                            Вы можете не беспокоится о непогоде или о зное на улице, котельные и кондиционеры обеспечат комфортные условия.


                        </div>
                        <div className="about__imge">
                            <img src={ass2} alt="about" />
                        </div>
                    </div>
                </div>
            </section>
            <section className='about'>
                <div className="container">

                    <div className="about__top">
                        <h2 className="about__title">
                            О тканевом комплексе «Silk Way» в цифрах:
                        </h2>

                    </div>
                    <div className="about__content">
                        От масштабов захватывает дух, общая площадь составляет 150 000 м2!


                        <br /> <br />


                        В рамках первого этапа полностью завершено возведения объектов общей площадью 11 500 м2 и счастливые владельцы помещений уже получили ключи.
                        <br /> <br />
                        В частности, там имеется 12 складов, площадь каждого составляет 560 квадратных метров.

                    </div>
                </div>
            </section>
            <section className='projects'>
                <div className="container">
                    <div className="projects__wrap">

                        <div className="projects__content">
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
                                        <img src={tex1} alt="projects" />
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
                            <div className="projects__text">
                                <p className="projects__description">В строительстве комплекса использовались только качественные материалы российского производства.
                                </p>
                                <p className="projects__description">В здании имеются санузлы в достаточном количестве, установлены системы пожаротушения и кондиционирования.</p>
                                <p className="projects__description">Любой согласится, что в процессе загрузки и выгрузки товаров нужен порядок. Это все учтено, для каждого из процессов предусмотрены отдельные линии (асфальтированные дороги). </p>
                                <p className="projects__description">
                                    На этом внимание к транспортным вопросам не ограничилось, для общей зоны уложена дорога из брусчатки. Все это имеет только одну цель — создать наилучшие условия для клиентов!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div>

    )
}

export default Stextile


