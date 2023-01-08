import '../cabinet.sass'
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { url } from "../../components/catalog/specialEuipmentCatalog";
import AuthContext from "../../store/auth-context";
import { ObjectIcon } from "../../components/icons/ObjectIcon"
import { ResponseIcon } from "../../components/icons/ResponseIcon"
import { NotificationIcon } from "../../components/icons/NotificationIcon"
import { FavoritesIcon } from "../../components/icons/FavoritesIcon"
import { SupportIcon } from "../../components/icons/SupportIcon"
import { TermsIcon } from "../../components/icons/TermsIcon"
import { CharityIcon } from "../../components/icons/CharityIcon"
import { SettingsIcon } from "../../components/icons/SettingsIcon"
import { ExitIcon } from "../../components/icons/ExitIcon"
import { RatingIcon } from "../../components/icons/RatingIcon"
import { RequestIcon } from "../../components/icons/RequestIcon"

const CabinetAside = props => {
    const ctx = useContext(AuthContext);
    const [active, setActive] = useState(true);

    const clickRemove = () => {
        ctx.toggleAside()
        setActive(false) //?
    }

    // Запрет обновления f5
    document.addEventListener('keydown', (e) => {
        e = e || window.event;
        if (e.keyCode == 116) {
            e.preventDefault();
        }
    });

    const exitAccount = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className="cabinet__aside">
            <button className="cabinet__aside_close" onClick={ctx.toggleAside}></button>
            <NavLink className={active ? 'cabinet__person active' : 'cabinet__person'} to='/lc/' >
                {props.data.avatar === null
                    ?
                    <div className="cabinet__img no_img"></div>
                    :
                    <div className="cabinet__img">
                        <img src={url + props.data.avatar} alt="" />
                    </div>
                }
                <div>
                    <p className="cabinet__name">{props.data.name}</p>
                    <p className="cabinet__grade">
                        <RatingIcon />
                        {props.data.mark === null ? 'Нет рейтинга' : props.data.mark}
                    </p>
                </div>
            </NavLink>
            <div className="cabinet__nav">
                <NavLink to="advertisement" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <ObjectIcon />
                    </div>
                    Мои объявления
                    <span>{ctx.adsNumber}</span>
                </NavLink>
                <NavLink to="request" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <RequestIcon />
                    </div>
                    Мои заявки
                </NavLink>
                <NavLink to="responses" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <ResponseIcon />
                    </div>
                    Отклики
                </NavLink>
                <NavLink to="notifications" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <NotificationIcon />
                    </div>
                    Уведомления
                    <span>4</span>
                </NavLink>
                <NavLink to="favorites" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <FavoritesIcon />
                    </div>
                    Избранные объявления
                </NavLink>
                <NavLink to="support" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <SupportIcon />
                    </div>
                    Служба поддержки
                </NavLink>
                <NavLink to="term" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <TermsIcon />
                    </div>
                    Условия использования
                </NavLink>
                <NavLink to="charity" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <CharityIcon />
                    </div>
                    Благотворительность
                </NavLink>
                <NavLink to="settings" className="cabinet__item" onClick={clickRemove}>
                    <div className="icon">
                        <SettingsIcon />
                    </div>
                    Настройки
                </NavLink>
            </div>
            <div className="exit_link" onClick={exitAccount}>
                <ExitIcon />
                Выйти из аккаунта
            </div>
        </div>
    )
}

export default CabinetAside;