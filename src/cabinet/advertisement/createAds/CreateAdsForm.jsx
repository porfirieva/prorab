import '../../cabinet.sass'
import { useEffect, useState, useRef } from "react";
import InputPhoto from "./InputPhoto";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { token } from "../../../App";
import SelectsDrop, { customStyles } from "../../../components/header/headerTop/headerSelects/selects";
import { DropdownIndicator } from "../../../components/header/headerTop/headerSelects/selects";
import Input from "../../../UI/Input"
import { CalendarIcon } from '../../../components/icons/CalendarIcon'


const typeMap = {
    0: 'спецтехнику',
    1: 'бригаду',
    2: 'недвижимость',
}

const convertTypeToString = (type) => typeMap[type];

const CreateAdsForm = props => {
    const { onSuccess, type } = props;
    const [images, setImages] = useState([]);
    const [cityId, setCityIid] = useState('');
    const [category, setCategory] = useState(null);
    const [categoryParent, setCategoryParent] = useState(null);
    const [isCreating, setIsCreating] = useState(false)

    const getCity = (city) => setCityIid(city.value)

    useEffect(() => {
        setCategoryParent(null);
    }, [type])

    const loadCategoryParent = (inputValue, callback) => {
        // запрашиваем список для "Тип техники"
        let options = []
        axios.create({
            baseURL: 'https://cc19244api.tmweb.ru/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            },
        }).get(`category?filter[type]=${type}&filter[depth]=1`)
            .then((response) => {
                // console.log('category?filter[type]', response.data.data);
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

    const loadCategory = (inputValue, callback) => {
        // запрашиваем список для "вида техники"
        if (categoryParent == null) {
            return;
        }
        axios.create({
            baseURL: 'https://cc19244api.tmweb.ru/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            },
        })
            .get(`category?filter[parent_id]=${categoryParent.value}`)
            .then(({ data }) => {
                // console.log('category?filter', data.data);
                callback(
                    data.data
                        .map(({ title, id }) => ({
                            label: title,
                            value: id
                        }))
                        .filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
                )
            })
    }

    const inputName = useRef();
    const inputModel = useRef();
    const inputPriceHour = useRef();
    const inputPriceDay = useRef();
    const inputAbout = useRef();

    const createAds = (event) => {
        event.preventDefault();
        setIsCreating(true)

        const formData = new FormData();
        let category_id = category === null ? '' : category.value;
        let selected_images = images.length === 0 ? null : images[0]
        let city = cityId === undefined ? '' : cityId

        formData.append('about', inputAbout.current.value);
        formData.append('type', type);
        formData.append('category_id', category_id);
        formData.append('model', inputModel.current.value);
        formData.append('name', inputName.current.value);
        formData.append('price_1', inputPriceHour.current.value);
        formData.append('price_2', inputPriceDay.current.value);
        formData.append('city_id', city)
        formData.append('image', selected_images)


        axios
            .post(
                "https://cc19244api.tmweb.ru/object",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                }
            )
            .then(({ data }) => {
                if (data.success) {
                    console.log(data)
                    onSuccess();
                } else {
                    console.error('не удалось')
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsCreating(false);
            })
    }


    return (
        <form>
            <div className="create_ads__center">
                <h6>Добавьте {convertTypeToString(type)}</h6>

                {!isCreating && <button onClick={createAds} className="btn_publish">Опубликовать</button>}

                <InputPhoto
                    images={images}
                    onLoad={setImages}
                    onDelete={setImages}
                />

                <div className="create_ads__box">
                    <div>
                        <div className="input_wrap">

                            <AsyncSelect
                                key={type}
                                components={{ DropdownIndicator }}
                                placeholder={"Тип техники"}
                                cacheOptions
                                defaultOptions
                                onChange={setCategoryParent}
                                value={categoryParent}
                                styles={customStyles}
                                loadOptions={loadCategoryParent}
                                noOptionsMessage={() => ''}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <AsyncSelect
                                key={categoryParent?.value}
                                components={{ DropdownIndicator }}
                                placeholder={"Вид техники"}
                                cacheOptions
                                onChange={setCategory}
                                defaultOptions
                                styles={customStyles}
                                loadOptions={loadCategory}
                                noOptionsMessage={() => 'Выберите тип техники'}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <Input
                                className="input"
                                type="text"
                                placeholder="Название техники"
                                ref={inputName}
                            ></Input>
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <Input
                                className="input"
                                type="text"
                                placeholder="Модель"
                                ref={inputModel}
                            ></Input>
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <Input
                                className="input"
                                type="text"
                                placeholder="Стоимость услуги"
                                ref={inputPriceHour}
                            ></Input>
                            <span className="span">за час</span>
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <Input
                                className="input"
                                type="text"
                                placeholder="Стоимость услуги"
                                ref={inputPriceDay}
                            ></Input>
                            <span className="span">за смену</span>
                        </div>
                    </div>
                    <div>
                        <div className="input_wrap">
                            <button className="open_date">
                                Свободные даты
                                <div className="icon">
                                    <CalendarIcon />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="input_wrap">
                        <Input ref={inputAbout} className="textarea" placeholder="Технические характеристики"></Input>
                    </div>
                </div>

                <h5 className="title_select">Место оказания услуги по сдаче в аренду</h5>
                <div className="create_ads__box">
                    <SelectsDrop getCity={getCity} />
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