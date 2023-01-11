import style from "./style.module.scss";
import mobile from "../assets/images/app-preview.png";
import mini_mobile from "../assets/images/app-preview-mob.png";
import google from "../assets/images/google-icon.svg";
import apple from "../assets/images/apple-icon.svg";
import gallery from "../assets/images/huawei-icon.svg";
import qr from "../assets/images/open-qr.png";
import ApplicationMobile from "../store/app-mobile-context";

import { useContext } from "react";

const MobileAppPage = () => {
    const ctx = useContext(ApplicationMobile);

    return (
        <div className="container">
            <div className={style.mobile_app_page}>
                <div className={style.left_side}>
                    <h2>
                        <b>Мобильное приложение</b>
                        <br></br>
                        <span>будь всегда на связи</span>
                    </h2>
                    <p className={`${style.text} ${style.text_first}`}>
                        Теперь вы можете сдать в аренду, а также найти и заказать любую спецтехнику, грузовой транспорт,
                        объекты недвижимости или нанять бригаду людей для выполнения работ за считанные минуты прямо со
                        своего смартфона или планшета.
                    </p>
                    <p className={style.text}>
                        Приложение работает без посредников в России и на территории стран СНГ. Услуга доступна на
                        разный срок: несколько часов, день, неделя, месяц.
                    </p>
                    <p className={style.text}>
                        <b>Наша цель – максимально упростить процесс поиска и аренды спецтехники для вас.</b>
                    </p>
                    <div className={style.platforms}>
                        <div className={style.platform} onClick={ctx.handleAppPopup}>
                            <img src={google} alt="" />
                            <div>
                                <p>загрузите на</p>
                                <span>Google Play</span>
                            </div>
                        </div>
                        <div className={style.platform} onClick={ctx.handleAppPopup}>
                            <img src={apple} alt="" />
                            <div>
                                <p>загрузите в</p>
                                <span>App Store</span>
                            </div>
                        </div>
                        <div className={style.platform} onClick={ctx.handleAppPopup}>
                            <img src={gallery} alt="" />
                            <div>
                                <p>загрузите в</p>
                                <span>AppGallery</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.img_container}>
                    <img className={style.mobile_img} src={mobile}></img>
                    <img className={style.open_popup} src={qr} onClick={ctx.handleAppPopup}></img>
                    <img src={mini_mobile} className={style.mini_mobile}></img>
                </div>
            </div>
        </div>
    );
};

export default MobileAppPage;
