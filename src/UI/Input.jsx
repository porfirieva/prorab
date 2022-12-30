import React from "react";

const Input = React.forwardRef(( props ,ref) => {
    return(
        <div className={props.classNameParent}>
            {props.h6 &&
                <h6>{props.h6}</h6>
            }
            <input className={props.className} type={props.type} placeholder={props.placeholder} ref={ref} defaultValue={props.defaultValue}/>
            {props.src &&
                <div className="icon">
                    <img src={props.src} alt="" />
                </div>
            }
        </div>
    )
})

export default Input;