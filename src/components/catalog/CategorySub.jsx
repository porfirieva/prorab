import './catalog.sass'
import Sorter from "./Sorter";
import React from "react";

const CategorySub = props =>{
    const handleClick = (event) => {
        event.target.classList.toggle('active');
        props.setArrayCategory([]);
    };

    return(
        <div className="page_nav">
            <div className="container">
                <ul>
                    {props.categorySub.map((item)=>
                        <li key={item.id}>
                            <div
                                style={{'display': 'none'}}
                                data_index={item.id}
                                data-parent={item.parent_id}
                                className='categorySub link'
                                onClick={handleClick}
                            >{item.title}</div>
                        </li>
                    )}
                </ul>



                <div className="mobile_box">
                    <button className="open_filter" onClick={props.onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                             fill="none">
                            <path
                                d="M2.45454 3.90909C3.25787 3.90909 3.90909 3.25787 3.90909 2.45454C3.90909 1.65122 3.25787 1 2.45454 1C1.65122 1 1 1.65122 1 2.45454C1 3.25787 1.65122 3.90909 2.45454 3.90909Z"
                                stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M8.99996 10.4545C9.80328 10.4545 10.4545 9.80328 10.4545 8.99996C10.4545 8.19663 9.80328 7.54541 8.99996 7.54541C8.19663 7.54541 7.54541 8.19663 7.54541 8.99996C7.54541 9.80328 8.19663 10.4545 8.99996 10.4545Z"
                                stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M15.5454 16.9999C16.3487 16.9999 16.9999 16.3487 16.9999 15.5454C16.9999 14.742 16.3487 14.0908 15.5454 14.0908C14.742 14.0908 14.0908 14.742 14.0908 15.5454C14.0908 16.3487 14.742 16.9999 15.5454 16.9999Z"
                                stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.45459 3.90918V17.0001" stroke="black" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M9 7.54545V1" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.5454 14.0909V1" stroke="black" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M9 10.4546V17" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <Sorter className={"links"} selected={props.selected} setSelected={props.setSelected} setArrayCategory={props.setArrayCategory}/>
                </div>

            </div>
        </div>
    )
}

export default CategorySub;