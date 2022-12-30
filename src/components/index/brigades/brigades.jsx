import '../main.sass'
import {useEffect, useState} from "react";
import {token} from "../../../App";
import {NavLink} from "react-router-dom";

function Brigades() {
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);
    const url = 'http://cc19244api.tmweb.ru/uploads/'

    useEffect(() => {
        fetch('https://cc19244api.tmweb.ru/category?filter[depth]=1&filter[type]=1',{
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
        return (
            <section className="brigades">
                <div className="container">
                    <h2 className="title_h2">Бригады</h2>
                    <div className="brigades__box">
                        {category.map(item =>
                        <NavLink to={{pathname :"/catalog/type2"}} state={{from: item.id, title: item.title}} className="brigades__block"  key={item.id}>
                            <div className="img">
                                <img src={url + item.image} alt=""/>
                            </div>
                            <p className="title">{item.title}</p>
                        </NavLink>
                        )}
                    </div>
                </div>
            </section>
        )
    }
}

export default Brigades;