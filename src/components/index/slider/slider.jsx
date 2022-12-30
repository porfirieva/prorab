import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
import  Slider from 'react-slick'
import slideImg from '../../../assets/images/slide.jpg'
import '../main.sass'
import {useState} from "react";
import SearchGoods from "./searchgoods";
import ProposeGoods from "./proposegoods";


function SliderMain() {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTab1 = () => {
        setActiveTab('tab1');
    }

    const handleTab2 = () => {
        setActiveTab('tab2');
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return(
        <div className='slider_wrap'>
            <div className="slider_information">
                <div className="slider_title">ПОИСК АРЕНДЫ СТРОИТЕЛЬНОЙ ТЕХНИКИ</div>
                <div className="slider_text">КАК МОЖНО ПРОЩЕ</div>
                <div className="slider_toggle">
                    <button className={activeTab === 'tab1' ? 'active btn': 'btn'}
                            onClick={handleTab1}
                            id="btn1">Ищу</button>
                    <button className={activeTab === 'tab2' ? 'active btn': 'btn'}
                            onClick={handleTab2}
                            id="btn2">Предлагаю</button>
                </div>
            </div>
            <Slider {...settings}>
                <div className='slide_item'>
                    <img src={slideImg} alt=""/>
                </div>

                <div className='slide_item'>
                    <img src={slideImg} alt=""/>
                </div>

                <div className='slide_item'>
                    <img src={slideImg} alt=""/>
                </div>

                <div className='slide_item'>
                    <img src={slideImg} alt=""/>
                </div>
            </Slider>

                    {activeTab === 'tab1' ? <SearchGoods/> : <ProposeGoods/>}

        </div>
    )
}

export default SliderMain;