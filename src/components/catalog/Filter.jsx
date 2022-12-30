import './catalog.sass'
import React, {useEffect, useState} from "react";


let hoursFrom = '';
let hoursTo = '';
let shiftFrom = '';
let shiftTo = '';
let arrayManufacturer = [];

const Filter = props => {
    const [isActivePrice, setActivePrice] = useState(false);
    const [isActiveManufacturer, setActiveManufacturer] = useState(false);


    const activeClickPrice = () =>{
        setActivePrice(!isActivePrice);
    }

    const activeClickManufacturer = () =>{
        setActiveManufacturer(!isActiveManufacturer);
    }

    const changePriceHourFrom = event => {
        hoursFrom = +event.target.value;
        props.getHoursFrom(hoursFrom);
        props.setArrayCategory([]);
    }

    const changePriceHourTo = event => {
        hoursTo = +event.target.value;
        props.getHoursTo(hoursTo);
        props.setArrayCategory([]);
    }

    const changePriceShiftFrom = event => {
        shiftFrom = +event.target.value;
        props.getHoursFromS(shiftFrom);
        props.setArrayCategory([]);
    }

    const changePriceShiftTo = event => {
        shiftTo = +event.target.value;
        props.getHoursToS(shiftTo);
        props.setArrayCategory([]);
    }


    const clickCheckboxManufacturer = event =>{
        let idArr = event.currentTarget.id
        if(!arrayManufacturer.includes(event.currentTarget.id)){
            arrayManufacturer.push(event.currentTarget.id);
        }else {
            arrayManufacturer = arrayManufacturer.filter(item => item !== idArr)
        }
        props.getManufacturer(arrayManufacturer);
        props.setArrayCategory([]);
    }

    const onOpenFilter = () => {
        props.setFilterMobile('');
    }


    return(
        <div className={`equipment__aside ${props.filterMobile}`}>
            <h5 className="title_menu">
                Меню
            </h5>

            <button className="close_filter"
                    onClick={onOpenFilter}
            ></button>

            <div className="wrap">
                <div className="box">

                    <button
                        className={isActivePrice ? 'btn_open active' : 'btn_open'}
                        onClick={activeClickPrice}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"
                             fill="none">
                            <path d="M10.5517 1.72412L5.99997 6.27585L1.44824 1.72412" stroke="#546EDB"
                                  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        Цена
                    </button>


                    <div className="block_open">
                        <div className="block_title__price">Цена за час</div>
                        <div className="price">
                            <div className="input">
                                <input className='price__length'
                                       type="number"
                                       placeholder={props.pricePlaceholder[0].min}
                                       onChange={changePriceHourFrom}/>
                            </div>
                            <div className="input">
                                <input className='price__length1'
                                       type="number"
                                       placeholder={props.pricePlaceholder[0].max}
                                       onChange={changePriceHourTo}/>
                            </div>
                        </div>
                    </div>

                    <div className="block_open">
                        <div className="block_title__price">Цена за смену</div>
                        <div className="price">
                            <div className="input">
                                <input className='price__length2'
                                       type="number"
                                       placeholder={props.pricePlaceholder[1].min}
                                       onChange={changePriceShiftFrom}/>
                            </div>
                            <div className="input">
                                <input className='price__length3'
                                       type="number"
                                       placeholder={props.pricePlaceholder[1].max}
                                       onChange={changePriceShiftTo}/>
                            </div>
                        </div>
                    </div>

                </div>



                {props.types === 0 && <div className="box">
                    <button
                        className={isActiveManufacturer ? 'btn_open active' : 'btn_open'}
                        onClick={activeClickManufacturer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"
                             fill="none">
                            <path d="M10.5517 1.72412L5.99997 6.27585L1.44824 1.72412" stroke="#546EDB"
                                  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        Производитель
                    </button>

                    <div className="block_open">
                        {props.manufacturer.map(item =>
                            <div className="checkbox" key={item}>
                                <input type="checkbox" id={item} onClick={clickCheckboxManufacturer}/>
                                <label htmlFor={item}>{item}</label>
                            </div>
                        )}
                    </div>
                </div>}


            </div>
        </div>
    )
}

export default Filter;