import React from 'react'
import Navbar from '../Navbar/Navbar'
import mail from '../../public/assets/icon/mail.png'
import inst from '../../public/assets/icon/inst.png'
import whats from '../../public/assets/icon/whats.png'

import './footer.scss'
const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__content">
                    <div className="footer__navbar">
                        <b>МЕНЮ</b>
                        <Navbar />
                    </div>
                    <nav className="footer__number">
                        <ul className="footer__number-list">
                            <li className="footer__number-item">
                                <b>КОНТАКТЫ</b>
                            </li>
                            <div className="footer__til">
                                <li className="footer__number-item">
                                    <a href="tel:0221 11 51 11">0221 11 51 11</a>
                                </li>
                                <li className="footer__number-item">
                                    <a href="tel:0709 22 55 88">0709 22 55 88</a>
                                </li>
                            </div>
                            <div className="footer__til">
                                <li className="footer__number-item">
                                    <a href="tel:0559 22 55 88">0559 22 55 88</a>
                                </li>
                                <li className="footer__number-item">
                                    <a href="tel:0779 22 55 88">0779 22 55 88</a>
                                </li>
                            </div>
                        </ul>
                    </nav>
                    <nav className="footer__web">
                        <b>СОЦСЕТИ</b>
                        <ul className="footer__web-list">

                            <li className="footer__web-item">
                                <a href="tel:0221 11 51 11">
                                    <img src={mail} alt="mail" />
                                </a>
                            </li>
                            <li className="footer__web-item">
                                <a href="tel:0709 22 55 88">
                                    <img src={inst} alt="inst" />
                                </a>
                            </li>
                            <li className="footer__web-item">
                                <a href="tel:0559 22 55 88">
                                    <img src={whats} alt="whats" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="footer__map">
                        <b>АДРЕС</b>
                        <div className="footer__map-link">
                            <a href="#">с. Ленинское, ул. Алма-Атинская, 1/3 </a>
                        </div>
                        <p className="footer__description">2022 © ОсОО "Silk Way". Юридический адрес:с. Ленинское, ул. Алма-Атинская, 1/3 </p>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer