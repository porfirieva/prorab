import {links} from "../paths";
import {NavLink} from "react-router-dom";
import logo from '../../../assets/images/logo.svg';
import {useState} from "react";
import HeaderMobile from "./HeaderMobile";

const HeaderBottom = () => {
    const [active, setActive] = useState(false)

    const burgerClick = () => {
        setActive(set => !set);
    }

    return(
            <div className="header__bottom">
                <div className="container">
                    <div className="box">
                        <NavLink to="/" className='header__logo'>
                            <img src={logo} alt=""/>
                        </NavLink>
                        <div className={`header__navbar`}>
                            <ul className="ul">
                                {
                                    links.map(key =>{
                                        const {url, title, id} = key;
                                        return (
                                            <li key={id}>
                                                <NavLink className={ navData => navData.isActive ? 'active item' : 'item' } to={url}>{title}</NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <a href="tel:8-495-128-73-00" className="btn_phone">8-495-128-73-00</a>
                            <a href="/" className="btn_catalog">Перейти в каталог</a>
                        </div>
                        <button className="btn_search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M10.3528 19.7057C15.5182 19.7057 19.7057 15.5182 19.7057 10.3528C19.7057 5.1874 15.5182 1 10.3528 1C5.1874 1 1 5.1874 1 10.3528C1 15.5182 5.1874 19.7057 10.3528 19.7057Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.8572 17.3428L20.5238 21" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button className={`header__burgir`} onClick={burgerClick}>
                            <span></span><span></span><span></span>
                        </button>
                        <a href="tel:8-495-128-73-00" className="btn_phone">8-495-128-73-00 </a>
                        <a href="#" className="btn_catalog">Перейти в каталог</a>
                    </div>
                </div>

                <HeaderMobile setActive={setActive} active={active} burgerClick={burgerClick} className={active ? 'active' : ''}/>
            </div>
    )
}

export default HeaderBottom;