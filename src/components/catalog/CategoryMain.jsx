import './catalog.sass'
import {useEffect, useState} from "react";
import {token} from "../../App";
import {url} from "./specialEuipmentCatalog";
import {useLocation} from "react-router";

const CategoryMain = props =>{
    const [category, setCategory] = useState([]);
    // Данные из NavLink
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        fetch(`https://cc19244api.tmweb.ru/category?filter[type]=${props.types}&pagination=&false`,{
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())

            .then((result) => {
                let main = '';
                main = result.data.filter(item => item.depth === 1);
                let sub = result.data.filter(item => item.depth > 1);
                setCategory(main);
                props.setCategorySub(sub);
            })
    }, [])

    //Клик на главные категории
    let getDataCategory = (event) => {
        let id = event.currentTarget.id;
        event.currentTarget.classList.toggle('checked');
        if (event.target.checked){
            props.setArrayCategory([])
            document.querySelectorAll('.categorySub').forEach(
                element=> {
                    if(element.getAttribute('data-parent') === id){
                        element.style.display = "block";
                        element.classList.add('active');
                    }
                }
            );

        }else {
            props.setArrayCategory([])
            document.querySelectorAll('.categorySub').forEach(element=> {
                    if(element.getAttribute('data-parent') === id){
                        element.style.display = "none";
                        element.classList.remove('active');
                    }
                }
            );
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

useEffect(() =>{
    if(state === null) {

    }else{
        props.setArrayCategory([]);
        document.querySelector('.equipment__special').style.display = 'none'
        document.querySelectorAll('.categorySub').forEach(
            element=> {
                if(element.getAttribute('data-parent') === state.from.toString()){
                    element.style.display = "block";
                    element.classList.add('active')
                }else{

                }
            }
        );
    }
}, [category])

    document.addEventListener('keydown', (e) => { // Запретить обновление на f5 чтобы не вызывать баг с лишними данными
        e = e || window.event;
        if(e.keyCode == 116  || (e.ctrlKey && e.keyCode == 82)){
            e.preventDefault();
        }
    });

    return(
        <div className="container">
            <h2 className="title_h2">
                {state === null && props.h1}
                {state !== null && state.title}
            </h2>

            <div className="equipment__special">

                {category.map(item =>

                    <div className="equipment__special__check" key={item.id}>

                        {state == null ?
                        <input type="checkbox"
                               onChange={getDataCategory}
                               id={item.id}
                        />
                        :
                            <input type="checkbox"
                                   onChange={getDataCategory}
                                   id={item.id}
                                   className={ state.from === item.id ? 'checked' : ''}
                                   defaultChecked={state.from === item.id}
                            />
                        }

                        <label htmlFor={item.id} className="product__wrap">
                            <div className="img">
                                <img src={url + item.image} alt="" />
                            </div>
                            <p className="title">{item.title}</p>
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryMain;