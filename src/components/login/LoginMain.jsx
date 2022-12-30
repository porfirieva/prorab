import './Login.sass'
import Registration from "./Registration";
import Login from "./Login";
import React, {useState} from "react";
import ModalRegister from "../../UI/Modal/ModalRegister";

const LoginMain = props => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [modal, setModal] = useState(false);

    const handleTab1 = () => {
        setActiveTab('tab1');
    }

    const handleTab2 = () => {
        setActiveTab('tab2');
    }

    const tabClose = () => {
        setActiveTab('tab1');
        setModal(false);
    }

    return(
        <section className="login">

            {modal &&
                <ModalRegister
                    title='Регистрация завершена'
                    onClick={tabClose}
                    className='modal_register'
                    titleBtn='Войти'
                    classNameTitle='modal_title'
                    classNameBtn='modal_btn'
                />
            }

            <div className="login__banner"></div>
            <div className="login__block">
                <div className="links">
                    <button
                       className={activeTab === 'tab1' ? 'active link': 'link'}
                       onClick={handleTab1}>Вход</button>
                    <button className={activeTab === 'tab2' ? 'active link': 'link'}
                       onClick={handleTab2}>Регистрация</button>
                </div>

                {activeTab === 'tab1' ? <Login /> : <Registration setModal={setModal}/>}

            </div>
        </section>
    )
}

export default LoginMain;