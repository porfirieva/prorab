import './Login.sass'
import React, {useRef, useState} from "react";

const Login = props => {
    const [error, setError] = useState('');

    const phoneRef = useRef();
    const passwordRef = useRef();

    const onLogin = (event) =>{
        event.preventDefault();

        let dataLogin = {
            'login': phoneRef.current.value,
            'password': passwordRef.current.value,
        }

        fetch("https://cc19244api.tmweb.ru/user/login", {
            method: "POST",
            crossDomain:true,
            headers: {
                'Accept': "application/json,",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(dataLogin)

        })
            .then(response => response.json())
            .then(responseJson => {
                if(responseJson.status == 200){
                    localStorage.setItem('token', responseJson.data.access_token)
                    console.log(responseJson);
                    window.location.reload();
                }
                setError(responseJson.data[0].message)
            })

    }

    return(
        <form className="login__entrance" onSubmit={onLogin}>
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
                <input type="number" className="" placeholder="Телефон" ref={phoneRef}/>
            </div>
            <div className="input">
                <input type="password" className="" placeholder="Пароль" ref={passwordRef}/>
                <div className="errorInput">{error}</div>
            </div>
            <button type='submit' className="login__btn">Вход</button>
        </form>
    )
}

export default Login;