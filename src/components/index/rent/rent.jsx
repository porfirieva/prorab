import '../main.sass'
import hyundai from '../../../assets/images/hyundai.jpg'
import React from "react";

function Rent() {
    return (
        <section className="rent_terms">
            <div className="container">
                <div className="rent_terms__box">
                    <div className="rent_terms__img">
                        <img src={hyundai} alt="" />
                    </div>
                    <div className="rent_terms__content">
                        <h2 className="title">Услуги</h2>
                        <p className="text">Услуги предоставляются на любой период времени. Мы сотрудничаем с частными лицами, само занятыми, коммунальными, строительными и другими заинтересованными организациями.</p>
                        <p className="text">Услуги через наш сервис предоставляются без посредников. В приложении указана цена за каждый вид работы. Подача заявок возможна круглосуточно – для этого вам лишь требуется пройти простую регистрацию через смс. Если у вас возникли вопросы, наши специалисты всегда на связи и готовы дать ответ.</p>
                        <p className="text">ПРОРАБ – надежный, выгодный и проверенный временем партнер!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Rent;