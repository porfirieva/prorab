import '../cabinet.sass'
import {useContext, useEffect, useState} from "react";
import {token} from "../../App";
import AuthContext from "../../store/auth-context";
import {url} from "../../components/catalog/specialEuipmentCatalog";

const AdsItems = props => {
    const ctx = useContext(AuthContext)
    const [category, setCategory] = useState([]);
    const [isActive, setActive] = useState(0)
    const [activeToggle, setActiveToggle] = useState(false);

    let itemData;
    const clickItem = event =>{
        itemData = +event.currentTarget.getAttribute('data-index');
        setActive(+event.currentTarget.getAttribute('data-index'));
        props.getIdItem(+event.currentTarget.getAttribute('data-index'));
    };

    const clickBtn = event => {
        setActive(+event.currentTarget.getAttribute('data-btn'));
        setActiveToggle(prev => !prev);
    }

    const redactHandler = event => {
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
            .then(res=> res.json())
            .then(res => {
                console.log(res.data)
                ctx.setRerender(prev => !prev);
            })
    }

    useEffect(() => {
        fetch(`https://cc19244api.tmweb.ru/object?filter[type]=${props.numberType - 1}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                }
            })
            .then(res=> res.json())
            .then(res => {
                setCategory(res.data);
                console.log(res.data)
            })
    }, [props.numberType, ctx.rerender]);


    return(
        <div className='scroll_if_needed'>

            {(category.filter(item => item.user_id === ctx.isUserId).map(item =>
        <div key={item.id} data-index={item.id} className={`cabinet_ads__item ${isActive === item.id ? 'active' : ''}`} onClick={clickItem}>
            <div className="options">
                <button onClick={clickBtn} data-btn={item.id} className={`btn ${isActive === item.id && activeToggle ? 'active' : ''}`}><span></span><span></span><span></span></button>
                <div className="block">
                    <a className="link redact" onClick={redactHandler}>Редактировать</a>
                    <a className="link deactivate" onClick={deactivateHandler}>Деактивировать</a>
                    <a className="link delete" onClick={deleteHandler}>Удалить</a>
                </div>
            </div>
            <div className="img">
                <img src={url + item.image} alt="" />
            </div>
            <div>
                <h3 className="title">{item.name}</h3>
                <div className="radio_box">
                    <div className="radio">
                        <input type="radio" id={'radioSub' + item.id} name={'radio' + item.id} defaultChecked/>
                        <label htmlFor={'radioSub' + item.id}>
                            <h5>{item.price_1}</h5>
                            <span>час</span>
                        </label>
                    </div>
                    <div className="radio">
                        <input type="radio" id={'radioSubs' + item.id} name={'radio' + item.id}/>
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