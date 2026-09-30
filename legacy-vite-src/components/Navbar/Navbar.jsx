import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.scss'


const Navbar = () => {
    return (
        <nav className='nav'>
            <div className="containerr">
                <div className="nav__row">
                    <ul className="footer__list nav__list">
                        <li className="nav__item">
                            <NavLink to="/">Главная</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/trade">Торговый комплекс</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/textile">Тканевый комплекс</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/industrial">Промышленный комплекс</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/residential">Жилой комплекс</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/residents">Резиденты</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/partners">Партнеры</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar