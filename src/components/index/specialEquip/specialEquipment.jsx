import './../main.sass'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import  Slider from 'react-slick'
import {useEffect, useState} from "react";
import {token} from "../../../App";
import {NavLink} from "react-router-dom";

function SpecialEquipment() {
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);
    const url = 'http://cc19244api.tmweb.ru/uploads/'

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
        fetch('https://cc19244api.tmweb.ru/category?filter[depth]=1&filter[type]=0',{
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result.status)
                if(result.status == 401){
                    localStorage.removeItem('token');
                    window.location.reload();
                }
                    setCategory(result.data);
                },
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
                <h2 className="title_h2">Спецтехника</h2>
                <Slider {...settings} className="product__slider">
                    {category.map(item =>
                    <NavLink to={{pathname :"/catalog/type0"}} state={{from: item.id, title: item.title}} className="product__wrap" key={item.id}>
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
        </section>
    )
    }
}

export default SpecialEquipment;