import '../cabinet.sass'
import {url} from "../../components/catalog/specialEuipmentCatalog";
import {useRef, useState} from "react";
import Input from "../../UI/Input";
import {token} from "../../App";
import FileInput from "./FileInput";
import axios from "axios";


const CabinetInfo = props => {
    const [imgAvatar, setImgAvatar] = useState(null);
    const [render, setRender] = useState(false);
    const [error, setError] = useState('')

    const inputEmail = useRef();
    const inputName = useRef();
    const inputWa = useRef();
    const inputTelegram = useRef();
    const inputViber = useRef();

    const getImg = (selectedImg) => {
        setImgAvatar(selectedImg)
    }


    const submitHandler = (event) => {
        event.preventDefault();
        let data = {
            name: inputName.current.value,
            email: inputEmail.current.value,
            whatsapp: inputWa.current.value,
            telegram: inputTelegram.current.value,
            viber: inputViber.current.value,
        }
        props.getRerender(render)
            fetch('https://cc19244api.tmweb.ru/user/identity-update', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json",
                    'Authorization': token,
                },
                body:  JSON.stringify(data)
            })
                .then(res => res.json())
                .then((result) => {
                    props.getRerender(render)
                    setError(result.data[0])
                    console.log(result.data[0].message)
                })
        console.log(data)

            const formData = new FormData();
            formData.append('avatar', imgAvatar);

            if(imgAvatar){
                axios.put('https://cc19244api.tmweb.ru/user/identity-update',
                    formData,
                    {
                        headers: {
                            'Accept':'application/json',
                            'Authorization': token,
                        },
                    })
                    .then(res => {
                        console.log('success' + res)
                        setRender(true);
                        props.getRerender(render)
                    })
                    .catch(err => console.log(err))
            }
    }

    const whatsAppHolder = props.data.whatsapp === null || props.data.whatsapp === '' ? 'Нет данных' : ''
    const telegramHolder = props.data.telegram === null || props.data.telegram === '' ? 'Нет данных' : ''
    const viberHolder = props.data.viber === null || props.data.viber === '' ?  'Нет данных' : ''
    const whatsAppValue = props.data.whatsapp !== null || props.data.whatsapp !== '' ? props.data.whatsapp : ''
    const telegramValue = props.data.telegram !== null || props.data.telegram !== '' ? props.data.telegram : ''
    const viberValue = props.data.viber !== null || props.data.viber !== '' ? props.data.viber : ''

    return(
        <form className="person_data" encType="multipart/form-data" onSubmit={submitHandler}>
            {props.data.avatar === null
                ?
                <>
                    <div className="person_img no_img">
                        <FileInput getImg={getImg}/>
                    </div>

                </>
                :
                <>
                    <div className="person_img">
                        {!imgAvatar &&
                        <img src={url + props.data.avatar} alt="" />
                        }
                        <FileInput getImg={getImg}/>
                    </div>

                </>
            }
            <div className="box box_input">
                <div className="left">
                    <h6>Личная информация</h6>

                    <Input classNameParent='input' type="text" placeholder='' defaultValue={props.data.name} ref={inputName}/>
                    {error &&
                        <p className='name__error'>{error.message}</p>
                    }
                    <Input h6='Номер телефона' classNameParent='input2' className="input_phone tel" type="number"
                           placeholder="" disabled defaultValue={props.data.phone}/>

                    <h5>Этот номер не подлежит изменению</h5>
                    <Input placeholder={whatsAppHolder} type='email'
                           src='/img/email.svg' classNameParent='input' ref={inputEmail} defaultValue={props.data.email}/>

                </div>
                <div className="right">

                    <Input className='input_phone tel' placeholder={whatsAppHolder} type='number'
                           src='/img/whatsapp.png' classNameParent='input' ref={inputWa} defaultValue={whatsAppValue}/>
                    <Input className='input_phone tel' placeholder={telegramHolder} type='number' defaultValue={telegramValue}
                           src='/img/telegram.png' classNameParent='input' ref={inputTelegram}/>
                    <Input className='input_phone tel' placeholder={viberHolder} type='number' defaultValue={viberValue}
                           src='/img/viber.png' classNameParent='input' ref={inputViber}/>

                </div>
                <button className="btn_save">Сохранить</button>
            </div>

        </form>
    )
}

export default CabinetInfo;