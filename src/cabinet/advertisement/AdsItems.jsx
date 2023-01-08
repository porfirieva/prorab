import '../cabinet.sass'
import { useContext, useEffect, useState } from "react";
import { token } from "../../App";
import AuthContext from "../../store/auth-context";
import { url } from "../../components/catalog/specialEuipmentCatalog";

const AdsItems = props => {
    const ctx = useContext(AuthContext)
    const [ads, setAds] = useState([]);
    const [isActive, setActive] = useState(0)
    const [activeToggle, setActiveToggle] = useState(false);

    const clickItem = id => {
        setActive(id);
        props.getIdItem(id);
    };

    const showOptions = id => {
        setActive(id);
        setActiveToggle(prev => !prev);
    }

    const editHandler = event => {
        setActiveToggle(prev => !prev);
    }

    const deactivateHandler = event => {
        setActiveToggle(prev => !prev);
    }

    const deleteHandler = event => {
        setActiveToggle(prev => !prev);
        fetch(`https://cc19244api.tmweb.ru/object/${isActive}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                }
            })
            .then(res => res.json())
            .then(res => {
                // console.log(res.data)
                ctx.setRerender(prev => !prev);
            })
    }

    useEffect(() => {
        setAds([])
        fetch(`https://cc19244api.tmweb.ru/object?filter[type]=${props.type}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                }
            })
            .then(res => res.json())
            .then(res => setAds(res.data))

    }, [props.type, ctx.rerender]);

    return (
        <div className='scroll_if_needed'>

            {(ads.filter(ad => ad.user_id !== ctx.isUserId).map(item =>
                <div key={item.id} className={`cabinet_ads__item ${isActive === item.id ? 'active' : ''}`} onClick={() => clickItem(item.id)}>
                    <div className="options">
                        <button onClick={() => showOptions(item.id)} className={`btn ${isActive === item.id && activeToggle ? 'active' : ''}`}><span></span><span></span><span></span></button>
                        <div className="block">
                            <a className="link redact" onClick={editHandler}>Редактировать</a>
                            <a className="link deactivate" onClick={deactivateHandler}>Деактивировать</a>
                            <a className="link delete" onClick={deleteHandler}>Удалить</a>
                        </div>
                    </div>
                    <div className="img">
                        <img src={url + item.image} alt="" />
                    </div>
                    <div className='ads__descr_preview'>
                        <h3 className="title">{item.name}</h3>
                        <div className="radio_box">
                            <div className="radio">
                                <input type="radio" id={'radioSub' + item.id} name={'radio' + item.id} defaultChecked />
                                <label htmlFor={'radioSub' + item.id}>
                                    <h5>{item.price_1}</h5>
                                    <span>час</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio" id={'radioSubs' + item.id} name={'radio' + item.id} />
                                <label htmlFor={'radioSubs' + item.id}>
                                    <h5>{item.price_2}</h5>
                                    <span>смена</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default AdsItems;