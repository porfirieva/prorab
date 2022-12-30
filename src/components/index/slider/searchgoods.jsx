import '../main.sass'
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {token} from "../../../App";

const url = 'http://cc19244api.tmweb.ru/uploads/';

const SearchGoods = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch('https://cc19244api.tmweb.ru/category?filter[depth]=0', {
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then((result) => {
                setCategory(result.data);
            })
    }, [])

    return(
        <div className="banner__bottom">
            {category.map(item =>
            <NavLink key={item.id} to={`/catalog/type${item.type}`} className="block">
                <div className="img">
                    <img src={url + item.image} alt="" />
                </div>
                <p className="title">{item.title}</p>
            </NavLink>
            )}
        </div>
    )
}

export default SearchGoods;