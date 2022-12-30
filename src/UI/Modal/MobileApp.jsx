import './Modal.sass'
import google from '../../assets/images/popup1.png'
import apple from '../../assets/images/popup2.png'
import gallery from '../../assets/images/popup3.png'
import qr from '../../assets/images/qr.png'
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";

const MobileApp = props => {
    const ctx = useContext(AuthContext);
    const [getData, setData] = useState(1);
    const [text, setText] = useState('Google Play');


    const clickMobileApp = event => {
        setData(+event.currentTarget.getAttribute('data-set'))
        setText(event.currentTarget.getAttribute('data-name'))
    }


    return(
        <>
        {ctx.closeMobileModal &&
        <div className='modal_mobile__app'>
            <div className="modal_overlay" onClick={ctx.closeMobileAppModal}></div>

            <div className="modal_container">
                <div className="modal__title">Отсканируйте QR-код</div>
                <div className="modal____close" onClick={ctx.closeMobileAppModal}>
                    <svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" fill="none"><g fill="#fff" clipPath="url(#a)"><path d="M17.678 17.678c-9.748 9.748-9.748 25.607 0 35.355 9.748 9.748 25.607 9.748 35.355 0 9.748-9.748 9.747-25.609 0-35.355-9.747-9.747-25.607-9.748-35.355 0Zm32.616 32.616c-8.236 8.237-21.64 8.238-29.878 0-8.238-8.237-8.236-21.641 0-29.878 8.237-8.236 21.64-8.238 29.878 0s8.238 21.64 0 29.878Z"/><path d="m40.709 27.016-5.477 5.477-5.477-5.477a1.936 1.936 0 1 0-2.74 2.739l5.478 5.477-5.477 5.477a1.936 1.936 0 1 0 2.739 2.739l5.477-5.477 5.477 5.477a1.936 1.936 0 1 0 2.739-2.739l-5.478-5.477 5.478-5.477a1.936 1.936 0 1 0-2.74-2.739Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 35.355 35.355 0l35.356 35.355-35.356 35.356z"/></clipPath></defs></svg>
                    </svg>
                </div>

                <div className="mobile_platforms">
                    <div className={`mobile_platform ${getData === 1 ? 'active' : ''}`} data-set='1' onClick={clickMobileApp}
                    data-name='Google Play'
                    >
                        <img src={google} alt=""/>
                        <span>Google Play</span>
                    </div>
                    <div className={`mobile_platform ${getData === 2 ? 'active' : ''}`}  data-set='2' onClick={clickMobileApp}
                         data-name='App Store'>
                        <img src={apple} alt=""/>
                        <span>App Store</span>
                    </div>
                    <div className={`mobile_platform ${getData === 3 ? 'active' : ''}`}  data-set='3' onClick={clickMobileApp}
                         data-name='AppGallery'>
                        <img src={gallery} alt=""/>
                        <span>AppGallery</span>
                    </div>
                </div>

                <div className="mobile_qr">
                    <div className="mobile_main_qr">
                        <div className="mobile_qr_name">{text}</div>
                        <div className="mobile_qr_image">
                            <img src={qr} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}
        </>
    )
}

export default MobileApp;