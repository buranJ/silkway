import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import logo from '../../public/logo.png'
import mail from '../../public/assets/icon/mail.png'
import inst from '../../public/assets/icon/inst.png'
import whats from '../../public/assets/icon/whats.png'
import './burger.scss';

const MenuContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
`;

const Burger = ({ isOpen, toggleMenu }) => {
  return (
    <MenuContainer
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? '0%' : '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <div className="menu-header">
        <img src={logo} alt="Logo" className="logo" />
        <FaTimes className="close-icon" onClick={toggleMenu} />
      </div>
      <nav className="menu-nav">
        <Link to="/" onClick={toggleMenu}>Главная</Link>
        <Link to="/trade" onClick={toggleMenu}>Торговый комплекс</Link>
        <Link to="/textile" onClick={toggleMenu}>Тканевый комплекс</Link>
        <Link to="/industrial" onClick={toggleMenu}>Промышленный комплекс</Link>
        <Link to="/residential" onClick={toggleMenu}>Жилой комплекс</Link>
        <Link to="/residents" onClick={toggleMenu}>Резиденты</Link>
        <Link to="/partners" onClick={toggleMenu}>Партнеры</Link>
      </nav>
      <div className="menu-footer">
        <div className="address">
          <p>Кыргызская Республика, г. Бишкек, с. Ленинское, ул. Алма-Атинская, 1/3</p>
        </div>
        <div className="social-media">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={inst} alt="Instagram" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img src={whats} alt="WhatsApp" />
          </a>
          <a href="mailto:info@example.com">
            <img src={mail} alt="Email" />
          </a>
        </div>
      </div>
    </MenuContainer>
  );
};

export default Burger;
