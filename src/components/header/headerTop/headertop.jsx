import '../header.sass';
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SelectsDrop from "./headerSelects/selects"
import AuthContext from "../../../store/auth-context";
import { url } from "../../catalog/specialEuipmentCatalog";
import { useLocation } from "react-router";

const HeaderTop = props => {
    const [isActive, setActive] = useState(false);
    const [city, setCity] = useState();
    const ctx = useContext(AuthContext);
    const location = useLocation();

    const toggleClass = () => {
        setActive(!isActive);
    };

    const getCity = city => {
        setCity(city);
    }

    const cityHtml = city ? city.label : '';

    const personalHeader = location.pathname.indexOf('/lc') > - 1 ?
        <div className="personal__header">
            <div className="personal_header__img">
                <img src={url + ctx.userData.avatar} alt="avatar" />
            </div>
            <div className="personal_header__name">
                {ctx.userData.name}
            </div>
        </div>
        : 'Личный кабинет'

    return (
        <div className="header__top">
            <div className="container">
                <div className="box">
                    <ul className="left">
                        <li className="li">
                            <NavLink to="/about" className="item">О нас</NavLink>
                            <NavLink to="/" className="item">Информация для исполнителей</NavLink>
                            <NavLink to="/" className="item">Информация для заказчиков</NavLink>
                            <span onClick={ctx.closeMobileAppModal} className="item">Мобильное приложение</span>
                        </li>
                    </ul>
                    <div className="right">
                        <button className="city">
                            <p
                                className={isActive ? 'active' : null}
                                onClick={toggleClass}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14"
                                    fill="none">
                                    <path
                                        d="M6.00008 0.333252C4.58608 0.33484 3.23045 0.897253 2.2306 1.8971C1.23075 2.89695 0.668336 4.25258 0.666748 5.66659C0.666748 7.83659 2.24208 9.63859 3.91075 11.5459C4.43875 12.1499 4.98541 12.7746 5.47208 13.4066C5.53436 13.4874 5.61435 13.5528 5.70588 13.5978C5.79742 13.6428 5.89807 13.6662 6.00008 13.6662C6.10209 13.6662 6.20274 13.6428 6.29428 13.5978C6.38581 13.5528 6.4658 13.4874 6.52808 13.4066C7.01475 12.7746 7.56141 12.1499 8.08941 11.5459C9.75808 9.63859 11.3334 7.83659 11.3334 5.66659C11.3318 4.25258 10.7694 2.89695 9.76956 1.8971C8.76971 0.897253 7.41408 0.33484 6.00008 0.333252ZM6.00008 7.66659C5.60452 7.66659 5.21784 7.54929 4.88894 7.32952C4.56004 7.10976 4.3037 6.7974 4.15232 6.43195C4.00095 6.0665 3.96134 5.66437 4.03851 5.2764C4.11568 4.88844 4.30616 4.53208 4.58587 4.25237C4.86557 3.97267 5.22194 3.78219 5.6099 3.70501C5.99786 3.62784 6.39999 3.66745 6.76545 3.81883C7.1309 3.9702 7.44326 4.22655 7.66302 4.55544C7.88278 4.88434 8.00008 5.27102 8.00008 5.66659C8.00008 6.19702 7.78937 6.70573 7.41429 7.0808C7.03922 7.45587 6.53051 7.66659 6.00008 7.66659Z"
                                        fill="#546EDB" />
                                </svg>
                                <span>
                                    {cityHtml ? cityHtml : 'Город не выбран'}
                                </span>
                            </p>
                            <SelectsDrop getCity={getCity} />
                        </button>
                        <NavLink to="/lc" className="link">
                            {personalHeader}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop;