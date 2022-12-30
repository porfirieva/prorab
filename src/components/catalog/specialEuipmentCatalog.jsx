import './catalog.sass'
import {token} from "../../App";
import React, {useEffect, useState} from "react";
import PaginationBot from "./paginatonBot";
import CategoryMain from "./CategoryMain";
import CategorySub from "./CategorySub";
import CategoryProducts from "./CategoryProducts";
import Filter from "./Filter";
import Sorter from "./Sorter";

export let paginationMaxPageCount = 0;
export const url = 'http://cc19244api.tmweb.ru/uploads/';


const SpecialEquipCatalog = props => {
    const [categorySub, setCategorySub] = useState([]); // Массив подкатегорий
    const [categoryProd, setCategoryProd] = useState([]); // Массив Продуктов
    const [arrayCategory, setArrayCategory] = useState([]); // Массив id главных категорий
    const [arraySubCategory, setArraySubCategory] = useState([]); // Массив data_index подкатегорий
    const [page, setPage] = useState(1); // Страница пагинации
    const [manufacturer, setManufacturer] = useState([]);
    const [pricePlaceholder, setPricePlaceholder] = useState([{}, {}]);
    // Часы/Смена Фильтр
    const [hoursFrom, setHoursFrom] = useState('');
    const [hoursTo, setHoursTo] = useState('');
    const [shiftFrom, setShiftFrom] = useState('');
    const [shiftTo, setShiftTo] = useState('');
    const [arrayManufacturer, setArrayManufacturer] = useState([]);

    const [selected, setSelected] = useState(0); // Выбор элементов

    const [filterMobile, setFilterMobile] = useState('') //фильтрв для мобилных


    const [isDisplayed , setIsDisplayed] = useState(false);


    const pagination = 'pagination[pageSize]=6'
    let checked = document.querySelectorAll('.checked');
    let activeSub = document.querySelectorAll('.categorySub.active')

    let openFilter = ''

    const onOpenFilter = () => {
        openFilter = 'active';
        setFilterMobile(openFilter);
    }

    const getPage = (page) =>{
        setPage(page)
    }



    const getHoursFrom = (hours) =>{
        setHoursFrom(hours);
    }
    const getHoursTo = (hours) =>{
        setHoursTo(hours);
    }
    const getHoursFromS = (hours) =>{
        setShiftFrom(hours);
    }
    const getHoursToS = (hours) =>{
        setShiftTo(hours)
    }
    const getManufacturer = (arr) =>{
        setArrayManufacturer(arr);
    }


    // Вывод товаров
    let urlMain = `https://cc19244api.tmweb.ru/object?filter[type]=${+props.types}&expand=user`
    let urlMainFetch = '';
    let arrayAll = [];


    useEffect(() => {
            checked.forEach(element => arrayCategory.push(element.id));
            setArraySubCategory([]);
            activeSub.forEach(element=> arraySubCategory.push(element.getAttribute('data_index')))
            arrayAll = arrayCategory.concat(arraySubCategory);
            urlMainFetch = urlMain;
            arrayAll.forEach(item => {
                urlMainFetch += '&filter[category_id][in][]=' + item
            })
            arrayManufacturer.forEach(item =>
                urlMainFetch += '&filter[model][in][]=' + item
            )
            if(hoursFrom > 0 && hoursTo > 0){
                urlMainFetch += `&filter[price_1][gte]=${hoursFrom}&filter[price_1][lte]=${hoursTo}`;
            }
            if(shiftFrom > 0 && shiftTo > 0){
                urlMainFetch += `&filter[price_2][gte]=${shiftFrom}&filter[price_2][lte]=${shiftTo}`
            }
            if(selected === 1){
                urlMainFetch += `&sort=-mark`
            }
            if(selected === 2){
                urlMainFetch += `&sort=-updated`
            }
            urlMainFetch += '&' + pagination + `&page=${page}`
            fetch(urlMainFetch, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token,
                }
            })
                .then(res => res.json().then(data=> ({data, headers: res.headers})))
                .then((result) => {
                    setCategoryProd(result.data.data)
                    console.log(urlMainFetch)
                    console.log(result.data.data)
                    paginationMaxPageCount = +(result.headers.get('X-Pagination-Page-Count'))
                })
    }, [arrayCategory] )

    //Фильтр модели
    let checkedFilterCategory = [];
    let subFilterCategory = [];
    let concatCategory = [];
    let urlFilterModels = `https://cc19244api.tmweb.ru/object/get-model-list?`;

    useEffect(() =>{
        checked.forEach(element => checkedFilterCategory.push(element.id));
        activeSub.forEach(element=> subFilterCategory.push(element.getAttribute('data_index')))
        concatCategory = checkedFilterCategory.concat(subFilterCategory);
        concatCategory.forEach(item => {
            urlFilterModels += '&filter[category_id][in][]=' + item
        });
        fetch(urlFilterModels, {
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then(result=> {
                setManufacturer(result.data)
            })
    }, [arrayCategory])

    //Цены фильтра минимум-максимум
    useEffect(() =>{
        fetch(`https://cc19244api.tmweb.ru/object/get-price-ranges`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then(result=> setPricePlaceholder(Object.values(result.data)))
    }, [])


    useEffect(() => {
        setInterval(() => {
            setIsDisplayed(true);
        }, 700);
    }, [])

    return(

        <section className="equipment">

            <CategoryMain setArrayCategory={setArrayCategory}
                          setCategorySub={setCategorySub}
                          types={props.types}
                          h1={props.h1}
            />

            <CategorySub selected={selected} setSelected={setSelected}
                         setArrayCategory={setArrayCategory}
                         categorySub={categorySub}
                         onClick={onOpenFilter}
            />

            <div className="container">
                <div className="equipment__wrap">
                <Filter
                    setArrayCategory={setArrayCategory}
                    manufacturer={manufacturer}
                    pricePlaceholder={pricePlaceholder}
                    getHoursFrom={getHoursFrom}
                    getHoursTo={getHoursTo}
                    getHoursFromS={getHoursFromS}
                    getHoursToS={getHoursToS}
                    getManufacturer={getManufacturer}
                    filterMobile={filterMobile}
                    setFilterMobile={setFilterMobile}
                    types={props.types}
                />

                    <div className="equipment__content">
                        <Sorter className="nav_link" selected={selected} setSelected={setSelected} setArrayCategory={setArrayCategory}/>
                        <CategoryProducts categoryProd={categoryProd}/>
                        {isDisplayed && <PaginationBot getPage={getPage} sets={setArrayCategory} />
                        }
                    </div>
                </div>
            </div>

        </section>
    )
}

export default SpecialEquipCatalog;