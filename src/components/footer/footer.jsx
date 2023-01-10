import './footer.scss'
import logo from './../../assets/images/logo.svg';
import apple from './../../assets/images/apple.jpg';
import google from './../../assets/images/google.jpg';
import { links } from "../header/paths";
import { NavLink } from "react-router-dom";
import { linksfooter } from "./pathsfooter";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Footer = props => {
    const ctx = useContext(AuthContext);
    return (
        <footer className="footer">
            <div className="container_wrap">
                <div className="footer__box">
                    <a href="#" className="footer__logo">
                        <img src={logo} alt="" />
                    </a>

                    <div className="footer__right">
                        <div className="footer__nav">
                            <NavLink className={navData => navData.isActive ? 'item active' : 'item'} to='/about'>О нас</NavLink>
                            <NavLink className={navData => navData.isActive ? 'item active' : 'item'} to='/info'>Информация для исполнителей</NavLink>
                            <NavLink className={navData => navData.isActive ? 'item active' : 'item'} to='/'>Информация для заказчиков</NavLink>
                            <span className='item' onClick={ctx.closeMobileAppModal}>Мобильное приложение</span>
                        </div>
                        {/* пока не понятно, насколько этот блок нужен
                         <div className="footer__nav min">
                            {
                                links.map(key => {
                                    const { url, title, id } = key;
                                    return (
                                        <NavLink className={navData => navData.isActive ? 'item active' : 'item'} key={id} to={url}>{title}</NavLink>
                                    )
                                })
                            }
                        </div> */}
                        <div className="footer__contacts">
                            <h5 className="title">Контакты</h5>
                            <a href="tel:8-495-128-73-00 " className="phone">8-495-128-73-00 </a>
                            <div className="box">
                                <a href="#" className="link">
                                    <img src={apple} alt="" />
                                </a>
                                <a href="#" className="link">
                                    <img src={google} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
