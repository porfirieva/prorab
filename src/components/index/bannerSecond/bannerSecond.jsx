import '../main.sass'
import circle from '../../../assets/images/black.png'
import excavator from '../../../assets/images/excavator.png'

function BannerSecond() {
    return (
        <section className="banner2">
            <img src={circle} alt="" className="bg" />
            <img src={excavator} alt="" className="img" />
            <div className="container">
                <h2 className="title">Выгодные условия<br />
                    <span>для сдачи и взятия в аренду спецтехники,   недвижимости и наём специалистов для выполнения строительных работ любой   сложности</span>
                </h2>
            </div>
        </section>
    )
}

export default BannerSecond;