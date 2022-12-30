import '../main.sass'
import React from "react";
import apple from '../../../assets/images/apple.jpg'
import google from '../../../assets/images/google.jpg'

const Program = props => {
    return(
        <>
            <h2 className="title_h2">О программе</h2>
            <div className="program">
                <div className="program__text">
                    <p className="text">ПРОРАБ – это удобное приложение для частных лиц и компаний, которые
                        пользуются строительными услугами. Теперь вы можете сдать в аренду, а также найти и заказать
                        любую спецтехнику, грузовой транспорт, объекты недвижимости или нанять бригаду людей для
                        выполнения работ за считанные минуты прямо со своего смартфона или планшета. Приложение
                        работает без посредников в России и на территории стран СНГ. Услуга доступна на разный срок:
                        несколько часов, день, неделя, месяц.</p>
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