import '../main.sass'
import React from "react";
import apple from '../../../assets/images/apple.jpg'
import google from '../../../assets/images/google.jpg'

const Program = props => {
    return (
        <>
            <h2 className="title_h2">О СЕРВИСЕ</h2>
            <div className="program">
                <div className="program__text">
                    <p className="text">ПРОРАБ – это агрегатор услуг в строительной отрасли в России и   странах СНГ, разработан для частных лиц и компаний, которые пользуются   строительными услугами.</p>
                    <h6>Наша цель – максимально упростить процесс поиска и аренды спецтехники для вас.</h6>
                </div>
                <div className="program__box">
                    <a href="#" className="link">
                        <img src={apple} alt="" />
                    </a>
                    <a href="#" className="link">
                        <img src={google} alt="" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Program;