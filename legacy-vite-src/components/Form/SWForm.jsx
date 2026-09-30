import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaPhone } from 'react-icons/fa';
import './form.scss';

const SWForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка данных формы
    console.log({ name, phone });
  };

  return (
    <section className="swform">
      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <h2><FaPhone /> СВЯЗЬ С НАМИ</h2>
          <div className="form__wrap">

            <label>Ваше имя
              <input className='form__input'
                type="text"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>Ваш номер телефона
              <PhoneInput
                country={'kg'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </label>
            <button type="submit">Отправить</button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default SWForm;
