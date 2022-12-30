import './CartProduct.sass'
import CartProductTop from "./CartProductTop";
import CartFeedback from "./CartFeedback";
import CartSlider from "./CartSlider";
import AdvantagesCart from "./AdvantagesCart";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {token} from "../../../App";



const CartProduct = props => {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [userId, setUserId] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [isSimilar, setIsSimilar] = useState([]);

    const params = useParams();

    const urlProduct = `https://cc19244api.tmweb.ru/object/${params.id}?expand=user`;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() =>{
        fetch(`https://cc19244api.tmweb.ru/user`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then(result => {
                setUserId(result.data);
            })
    }, [])
        //

    useEffect(() =>{
        fetch(urlProduct, {
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then(result => {
                setProduct(result.data);
                setIsSimilar(result.data.id)
                return result.data;
            })
            .then(url => {
                fetch(`https://cc19244api.tmweb.ru/user/${url.user_id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': token,
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        props.onUserData(result.data);
                        setUser(result.data);
                        return result.data;
                    })

                fetch(`https://cc19244api.tmweb.ru/object?filter[type]=&filter[category_id][in][]=${url.category_id}&expand=user`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': token,
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        setSimilar(result.data);
                    })

                        fetch(`https://cc19244api.tmweb.ru/mark?filter[user_to_id]=${url.id}`, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': token,
                            }
                        })
                            .then(res => res.json())
                            .then(result => {
                                setFeedback(result.data);
                                props.getIdPage(params.id);
                            })
            })
    }, [])



        return(
            <>
                <CartProductTop product={product} user={user}/>
                <CartFeedback feedback={feedback} setUserId={setUserId} userId={userId}/>
                <CartSlider similar={similar} isSimilar={isSimilar}/>
                <section className="advantages card">
                    <AdvantagesCart />
                    {/*<CartSlider />*/}
                </section>
            </>
        )
}

export default CartProduct;