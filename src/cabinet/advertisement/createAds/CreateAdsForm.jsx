import '../../cabinet.sass'
import {useEffect, useReducer, useState} from "react";
import InputPhoto from "./InputPhoto";
import AsyncSelect from "react-select/async";
import {components} from "react-select";
import axios from "axios";
import {token} from "../../../App";
import SelectsDrop, {customStyles} from "../../../components/header/headerTop/headerSelects/selects";
import  {DropdownIndicator} from "../../../components/header/headerTop/headerSelects/selects";


const reducer = (state, action) => {
    switch (action.type){
        case 'plus':
            return {tech: state.tech + 1, forTech: state.forTech + 1}
    }
}

const CreateAdsForm = props => {
    const [state, dispatch] = useReducer(reducer, {tech: 0,  forTech: 1000});
    const [typeString, setTypeString] = useState('');
    const [typeTech, setTypeTech] = useState(0);

    const getTypeTech = value => {
        setTypeTech(value)
        console.log(typeTech)
        dispatch({type: 'plus'});
    }


    useEffect(() => {
        switch (props.numberType) {
            case 1:
                setTypeString('спецтехнику');
                dispatch({type: 'plus'})
                setTypeTech('')
                break
            case 2:
                setTypeString('бригаду');
                dispatch({type: 'plus'})
                setTypeTech('')
                break
            case 3:
                setTypeString('недвижимость');
                dispatch({type: 'plus'})
                setTypeTech('')
                break
        }
    },[props.numberType])
        // https://cc19244api.tmweb.ru/category?filter[parent_id]




    // Тип техники
    const loadType = (inputValue, callback) => {
        let options = []
        axios.create({
            baseURL: 'https://cc19244api.tmweb.ru/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            },
        }).get(`category?filter[type]=${props.numberType - 1}&filter[depth]=1`)
            .then((response) => {
                console.log(response.data.data);
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.title,
                        value: permission.id
                    })
                    callback(options.filter((i) =>
                        i.label.toLowerCase().includes(inputValue.toLowerCase())));
                })
            })
    }

    const loadType2 = (inputValue, callback) => {
        let options = []
        axios.create({
            baseURL: 'https://cc19244api.tmweb.ru/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            },
        }).get(`category?filter[parent_id]=${typeTech.value}`)
            .then((response) => {
                console.log(response.data.data);
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.title,
                        value: permission.id
                    })
                    callback(options.filter((i) =>
                        i.label.toLowerCase().includes(inputValue.toLowerCase())));
                })
            })
    }

function getCity(){

}
    return(
        <form>
            <div className="create_ads__center">
                <h6>Добавьте {typeString}</h6>

                <button type='submit' className="btn_publish">Опубликовать</button>

                <InputPhoto />

                <div className="create_ads__box">
                    <div>
                        <div className="input_wrap">

                            <AsyncSelect
                                key={state.forTech}
                                components={{DropdownIndicator}}
                                placeholder={"Тип техники"}
                                cacheOptions
                                defaultOptions
                                onChange={getTypeTech}
                                value={typeTech}
                                styles={customStyles}
                                loadOptions={loadType}
                                noOptionsMessage={() => ''}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <AsyncSelect
                                key={state.tech}
                                components={{DropdownIndicator}}
                                placeholder={"Вид техники"}
                                cacheOptions
                                defaultOptions
                                styles={customStyles}
                                loadOptions={loadType2}
                                noOptionsMessage={() => 'Выберите тип техники'}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <input className="input" type="text" placeholder="Название техники " />
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <input className="input" type="text" placeholder="Модел " />
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <input className="input" type="text" placeholder="Стоимость услуги " />
                            <span className="span">за час</span>
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <input className="input" type="text" placeholder="Стоимость услуги " />
                            <span className="span">за смену</span>
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <button className="open_date">
                                Свободные даты
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                        <path
                                            d="M12.7913 0.00092119C13.17 0.0246108 13.4623 0.349232 13.4522 0.735076V1.76997C16.4609 2.06186 18 3.72477 18 6.71446V14.9848C18 18.3106 16.1043 20 12.3739 20H5.62609C1.89565 20 0 18.3106 0 14.9848V6.71446C0 4.72428 0.678261 3.30019 2.06957 2.46874L2.16716 2.41312C2.36884 2.31898 2.6054 2.32761 2.80202 2.44176C3.0314 2.57494 3.16687 2.82876 3.15169 3.09698C3.13652 3.3652 2.97333 3.60155 2.73043 3.70708C1.8087 4.25548 1.37391 5.21077 1.37391 6.71446V6.97981H14.0609C14.4403 6.97981 14.7478 7.29266 14.7478 7.67859C14.7478 8.06451 14.4403 8.37736 14.0609 8.37736H1.37391V14.9848C1.37391 17.5233 2.6087 18.5759 5.62609 18.5936H12.3739C15.3478 18.5936 16.6174 17.5145 16.6174 14.9759V6.70561C16.6174 4.4943 15.6522 3.42403 13.4522 3.16752V3.83975C13.4014 4.19806 13.093 4.45964 12.7374 4.44599C12.3818 4.43234 12.0936 4.14786 12.0696 3.78668V0.673159L12.0823 0.562557C12.1106 0.417619 12.1836 0.284496 12.2921 0.183413C12.4278 0.0570589 12.6076 -0.00867809 12.7913 0.00092119ZM13.187 14.197L13.2977 14.2041C13.4876 14.2279 13.6656 14.315 13.8031 14.4534C13.9681 14.6196 14.0609 14.8459 14.0609 15.082C14.0609 15.5706 13.6716 15.9666 13.1913 15.9666C12.7111 15.9666 12.3217 15.5706 12.3217 15.082C12.3217 14.5935 12.7111 14.1975 13.1913 14.1975L13.187 14.197ZM9.01739 14.1975L9.12647 14.2044C9.55523 14.259 9.88696 14.6311 9.88696 15.082C9.88696 15.5706 9.49764 15.9666 9.01739 15.9666C8.53714 15.9666 8.14783 15.5706 8.14783 15.082C8.14783 14.5935 8.53714 14.1975 9.01739 14.1975ZM4.848 14.197L4.95859 14.2041C5.14845 14.2279 5.32652 14.315 5.46398 14.4534C5.62894 14.6196 5.72174 14.8459 5.72174 15.082C5.72174 15.5706 5.33242 15.9666 4.85217 15.9666C4.37193 15.9666 3.98261 15.5706 3.98261 15.082C3.98261 14.5935 4.37193 14.1975 4.85217 14.1975L4.848 14.197ZM13.187 10.615L13.2977 10.6218C13.4876 10.6456 13.6656 10.7327 13.8031 10.8711C13.9681 11.0373 14.0609 11.2636 14.0609 11.4997C14.0609 11.9882 13.6716 12.3843 13.1913 12.3843C12.7111 12.3843 12.3217 11.9882 12.3217 11.4997C12.3217 11.0112 12.7111 10.6152 13.1913 10.6152L13.187 10.615ZM9.01739 10.6152L9.12647 10.6221C9.55523 10.6767 9.88696 11.0488 9.88696 11.4997C9.88696 11.9882 9.49764 12.3843 9.01739 12.3843C8.53714 12.3843 8.14783 11.9882 8.14783 11.4997C8.14783 11.0112 8.53714 10.6152 9.01739 10.6152ZM4.848 10.615L4.95859 10.6218C5.14845 10.6456 5.32652 10.7327 5.46398 10.8711C5.62894 11.0373 5.72174 11.2636 5.72174 11.4997C5.72174 11.9882 5.33242 12.3843 4.85217 12.3843C4.37193 12.3843 3.98261 11.9882 3.98261 11.4997C3.98261 11.0112 4.37193 10.6152 4.85217 10.6152L4.848 10.615ZM5.23913 0.106447C5.59328 0.106447 5.8909 0.377086 5.93043 0.735076V1.69921H9.86087C10.2403 1.69921 10.5478 2.01206 10.5478 2.39798C10.5478 2.7839 10.2403 3.09675 9.86087 3.09675H5.91304V3.79553C5.91306 3.9824 5.83949 4.16149 5.70877 4.29279C5.57806 4.42409 5.40109 4.49667 5.21739 4.4943L5.11694 4.48427C4.78964 4.42674 4.54338 4.13445 4.54777 3.78668V0.735076L4.56718 0.630483C4.64745 0.325665 4.9204 0.106447 5.23913 0.106447Z"
                                            fill="#414253"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="input_wrap">
                        <textarea className="textarea" placeholder="Технические характеристики"></textarea>
                    </div>
                </div>

                <h5 className="title_select">Место оказания услуги по сдаче в аренду</h5>
                <div className="create_ads__box">
                    <SelectsDrop getCity={getCity}/>
                </div>


            </div>
            <div className="create_ads__right">
                <h5 className="title">Свободные даты</h5>
                <div className="look-calendar">

                </div>
                <div className="btn_check">
                    <div className="check">
                        <input type="checkbox" id="1" />
                        <label htmlFor="1">Все свободно</label>
                    </div>
                    <div className="check">
                        <input type="checkbox" id="12" />
                        <label htmlFor="12">Только выходные</label>
                    </div>
                    <div className="check">
                        <input type="checkbox" id="123" />
                        <label htmlFor="123">Все кроме выходных</label>
                    </div>
                </div>
                <button className="btn_save">Сохранить</button>
            </div>
        </form>
    )
}

export default CreateAdsForm;