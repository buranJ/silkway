
import { NavLink } from 'react-router-dom'
import logo from '../../public/logo.png'
import './header.scss';
import Navbar from '../Navbar/Navbar';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleMenu }) => {

    return (
        <>
            <header className='header'>
                <div className="container">
                    <div className="header__content">
                        <NavLink to='/' className="logo">
                            <img src={logo} alt="logo" />
                        </NavLink>
                        <Navbar />
                        <FaBars className="menu-icon" onClick={toggleMenu} />

                    </div>
                </div>
            </header>
        </>

    )
}

export default Header