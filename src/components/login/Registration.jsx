import './Login.sass'
import React, { useRef, useState} from "react";
import ym from 'react-yandex-metrika';


const Registration = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')


    const inputName = useRef();
    const inputTel = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();

    const fetchRegistration = async (event) => {
        event.preventDefault();

        let dataUser = {
            name: inputName.current.value,
            email: inputEmail.current.value,
            phone: inputTel.current.value,
            password: inputPassword.current.value
        }

        const response = await fetch("https://cc19244api.tmweb.ru/user", {
            method: "POST",
            // crossDomain:true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify(dataUser)


        })
        const data = await response.json();
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');

        console.log(data)
        if(data.status === 201){
            props.setModal(true);
        }

        for(let i=0; i < data.data.length; i++){
            switch (data.data[i].field){
                case 'name':
                    setName(data.data[i].message)
                    break
                case 'email':
                    setEmail(data.data[i].message)
                    break
                case 'phone':
                    setPhone(data.data[i].message)
                    break
                case 'password':
                    setPassword(data.data[i].message)
                    break
            }
        }
        inputName.current.value = ''
        inputTel.current.value = ''
        inputEmail.current.value = ''
        inputPassword.current.value = ''

    }

    return(
        <form className="login__registration" onSubmit={fetchRegistration}>


            <div className="login__box">
                <div className="input">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                            <path d="M8.09713 9.94816C10.5681 9.94816 12.5712 7.94505 12.5712 5.47408C12.5712 3.00311 10.5681 1 8.09713 1C5.62616 1 3.62305 3.00311 3.62305 5.47408C3.62305 7.94505 5.62616 9.94816 8.09713 9.94816Z" stroke="#414253" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M1.00001 16.1708C0.998828 15.8563 1.06917 15.5456 1.20574 15.2623C1.63429 14.4052 2.84281 13.9509 3.84563 13.7452C4.56886 13.5909 5.30208 13.4878 6.03983 13.4367C7.40572 13.3167 8.7795 13.3167 10.1454 13.4367C10.8831 13.4884 11.6163 13.5915 12.3396 13.7452C13.3424 13.9509 14.5509 14.3623 14.9795 15.2623C15.2541 15.8399 15.2541 16.5104 14.9795 17.088C14.5509 17.9879 13.3424 18.3993 12.3396 18.5965C11.6172 18.7572 10.8837 18.8632 10.1454 18.9136C9.03366 19.0078 7.91675 19.025 6.80266 18.965C6.54553 18.965 6.29697 18.965 6.03983 18.9136C5.30426 18.8638 4.57358 18.7578 3.8542 18.5965C2.84281 18.3993 1.64286 17.9879 1.20574 17.088C1.06987 16.8013 0.999595 16.488 1.00001 16.1708Z"
                                  stroke="#414253" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <input type="text" required placeholder="Имя/ИП/ООО" ref={inputName}/>
                    <div className="errorInput">{name}</div>
                </div>
                <div className="input">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
                            <path d="M1.3275 0C0.5943 0 0 0.59385 0 1.3272C0 2.0595 0.5943 2.65365 1.3275 2.65365C2.06055 2.65365 2.65485 2.0595 2.65485 1.3272C2.65485 0.59385 2.06055 0 1.3275 0Z" fill="#414253"/>
                            <path d="M11.558 10.2311C10.8249 10.2311 10.2305 10.8252 10.2305 11.5581C10.2305 12.2909 10.8249 12.8847 11.558 12.8847C12.2907 12.8847 12.8843 12.2909 12.8843 11.5581C12.8843 10.8252 12.2907 10.2311 11.558 10.2311Z" fill="#414253"/>
                            <path d="M11.558 5.11572C10.8249 5.11572 10.2305 5.70987 10.2305 6.44262C10.2305 7.17552 10.8249 7.76937 11.558 7.76937C12.2907 7.76937 12.8843 7.17552 12.8843 6.44262C12.8843 5.70987 12.2907 5.11572 11.558 5.11572Z" fill="#414253"/>
                            <path d="M11.558 2.65377C12.2907 2.65377 12.8843 2.05962 12.8843 1.32732C12.8843 0.593972 12.2907 0.00012207 11.558 0.00012207C10.8249 0.00012207 10.2305 0.593972 10.2305 1.32732C10.2306 2.05947 10.8251 2.65377 11.558 2.65377Z" fill="#414253"/>
                            <path d="M6.44243 5.11572C5.70953 5.11572 5.11523 5.70987 5.11523 6.44262C5.11523 7.17552 5.70953 7.76937 6.44243 7.76937C7.17458 7.76937 7.76903 7.17552 7.76903 6.44262C7.76903 5.70987 7.17473 5.11572 6.44243 5.11572Z" fill="#414253"/>
                            <path d="M1.3269 7.76952C2.05973 7.76952 2.6538 7.17545 2.6538 6.44262C2.6538 5.7098 2.05973 5.11572 1.3269 5.11572C0.594074 5.11572 0 5.7098 0 6.44262C0 7.17545 0.594074 7.76952 1.3269 7.76952Z" fill="#414253"/>
                            <path d="M6.44243 10.2311C5.70953 10.2311 5.11523 10.8252 5.11523 11.5581C5.11523 12.2909 5.70953 12.8847 6.44243 12.8847C7.17458 12.8847 7.76903 12.2909 7.76903 11.5581C7.76903 10.8252 7.17473 10.2311 6.44243 10.2311Z" fill="#414253"/>
                            <path d="M6.44243 15.3459C5.70953 15.3459 5.11523 15.9405 5.11523 16.6731C5.11523 17.406 5.70953 17.9999 6.44243 17.9999C7.17458 17.9999 7.76903 17.406 7.76903 16.6731C7.76903 15.9405 7.17473 15.3459 6.44243 15.3459Z" fill="#414253"/>
                            <path d="M1.32675 12.8846C2.05949 12.8846 2.6535 12.2906 2.6535 11.5578C2.6535 10.8251 2.05949 10.2311 1.32675 10.2311C0.594006 10.2311 0 10.8251 0 11.5578C0 12.2906 0.594006 12.8846 1.32675 12.8846Z" fill="#414253"/>
                            <path d="M6.44243 0C5.70953 0 5.11523 0.59385 5.11523 1.3272C5.11523 2.0595 5.70953 2.65365 6.44243 2.65365C7.17458 2.65365 7.76903 2.0595 7.76903 1.3272C7.76903 0.59385 7.17473 0 6.44243 0Z" fill="#414253"/>
                        </svg>
                    </div>

                    <input type="number" required placeholder="Телефон" ref={inputTel} />
                    <div className="errorInput">{phone}</div>
                </div>
                <div className="input">

                    <input type="email" required placeholder='Email' ref={inputEmail}/>
                    <div className="errorInput">{email}</div>
                </div>
                <div className="input">

                    <input type="password" required placeholder='Пароль' ref={inputPassword}/>
                    <div className="errorInput">{password}</div>
                </div>
            </div>
            <button type='submit' className="login__btn" onClick={() => {
                ym(91815886, 'reachGoal', 'reg_ok')
                console.log('click')
            }}>Регистрация</button>
        </form>
    )
}

export default Registration;