import './Modal.sass';
import modalLock from '../../assets/images/modalimg3.png';
import modalImg from '../../assets/images/modalimg2.png';
import vk from '../../assets/images/vk-icon.png';
import viber from '../../assets/images/viber-icon.png';
import whatsapp from '../../assets/images/whatsapp-icon.png';
import telegram from '../../assets/images/telegram-icon.png';
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

const ModalContacts = props => {
    const ctx = useContext(AuthContext);
    console.log(props.userData)
    return(
        <>
            {ctx.isVipStatus &&
                <div className="modal__card modal__card2">
                    <h3 className="title">Контакты</h3>
                    <img src={modalLock} alt="" className="img2"/>
                    <p className="text">Это платная услугу, для того чтобы открыть контакты нужно заплатить 300рублей </p>
                    <button className="modal__btn2">Открыть контакты</button>
                </div>
            }
            {!ctx.isVipStatus &&
                <div className="modal__card">
                    <h3 className="title">Контакты</h3>
                    <img src={modalImg} alt="" className="img2" />
                        <p className="phone">{props.userData.phone}</p>
                        <p className="text">Romania, Bucharest, Bucharest Sector 6, Prelungirea Ghencea, 6</p>
                        <div className="soc">

                            <a href={`https://t.me/${props.userData.telegram}`} target='_blank' rel="noreferrer" className="item">
                                <img src={telegram} alt=""/>
                            </a>


                            {props.userData.whatsapp > 0 && <a href={`https://wa.me/${props.userData.whatsapp}`} target='_blank' rel="noreferrer" className="item">
                                <img src={whatsapp} alt=""/>
                            </a>}

                            {props.userData.viber > 0 && <a href={`viber://chat?number=${props.userData.viber}`} target='_blank' rel="noreferrer" className="item">
                                <img src={viber} alt=""/>
                            </a>}

                            {/*<a href="#" target='_blank' className="item">*/}
                            {/*    <img src={vk} alt="" />*/}
                            {/*</a>*/}

                        </div>

                        <button className="modal__btn2" onClick={ctx.closeModal}>Закрыть</button>
                </div>
            }
        </>
    )
}

export default ModalContacts;