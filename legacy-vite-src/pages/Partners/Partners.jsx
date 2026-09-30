
import React, { useState } from 'react';
import arrDown from '../../public/assets/icon/arrDown.png'
const Partners = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);

  };
  return (
    <main className='parners'>
      <section className='about'>
        <div className="container">

          <div className="about__top">
            <h2 className="about__title">
              НАШИ ТЕХНИЧЕСКИЕ ПАРТНЕРЫ
            </h2>
            <img onClick={handleClick} src={arrDown} alt="arr" />
          </div>
          <div className="about__content">
            Огромная площадь протяженностью 200 000 м2 предназначено для заводов и фабрик. <br /> <br />

            Для удобства резидентов, клиентов и персонала будет возведено большая мечеть и будут создано большое пространство для парковки автомашин.
            <br />
            <div className={`text-container ${isVisible ? 'visible' : ''}`}>
              <br />
              На данном этапе завершено возведение индустриальных объектов общей площадью более 11 тысяч квадратных метров.
              <br />
              Кроме того, ведется строительство фабрик и заводов общей площадью в 40 тысяч квадратных метров.
              <br />
              В промышленном комплексе нет требования по производству только определенного вида товаров. <br /> <br /> Можно возводить предприятия по выпуску различных видов продукции: одежды, стройматериалы, как пенобетон, газобетон и так далее.
              <br />

            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

export default Partners