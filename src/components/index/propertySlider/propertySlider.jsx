import './../main.sass'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import  Slider from 'react-slick'
import {useEffect, useState} from "react";
import {token} from "../../../App";
import {NavLink} from "react-router-dom";


function PropertySlider() {
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);
    const url = 'https://cc19244api.tmweb.ru/uploads/'

    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    useEffect(() => {
        fetch('https://cc19244api.tmweb.ru/category?filter[depth]=1&filter[type]=2',{
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then((result) => setCategory(result.data),
                (error) => {
                    setError(error);
                }
            )
    }, [])
    if (error){
        return <div className='error__react_module'>
            Произошла ошибка загрузка модуля, перезагрузите страницу
        </div>
    }else {

        return(
            <section className="product">
                <div className="container">
                    <h2 className="title_h2">Недвижимость</h2>
                    <div className="product__slider">

                        <Slider {...settings} className="product__slider">
                            {category.map(item =>
                                <NavLink className="product__wrap" to={{pathname :"/catalog/type1"}} state={{from: item.id, title: item.title}} key={item.id}>
                                    <div className="img">
                                        <img src={url + item.image} alt="" />
                                    </div>

                                    <p className="title">
                                        {item.title}
                                    </p>
                                </NavLink>
                            )}
                            <a href="#" className="product__wrap">
                            </a>
                        </Slider>
                    </div>
                </div>
            </section>
        )
    }
}

export default PropertySlider;