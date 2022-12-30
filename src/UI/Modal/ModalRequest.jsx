import './Modal.sass';
import {useContext, useEffect, useRef, useState} from "react";
import ModalClickSvg from "./ModalSvg/ModalClickSvg";
import ModalAddressSvg from "./ModalSvg/ModalAddressSvg";
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import moment from "moment";
import AuthContext from "../../store/auth-context";
import {token} from "../../App";


const ModalRequest = props => {
    const [isOrdered, setIsOrdered] = useState('');
    const ctx = useContext(AuthContext);

    const [isToggle, setIsToggle] = useState(false);
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focus, setFocus] = useState(START_DATE)

    const commentText = useRef();
    const timeFromInput = useRef();
    const timeToInput = useRef();
    const addressInput = useRef()
    const paymentToInput = useRef()
    const paymentFromInput = useRef()

    const handleFocusChange = newFocus => {
        setFocus(newFocus || START_DATE)
    }

    const handleToggle = () => {
        setIsToggle(prevState => !isToggle);
    }

    const modifiers = {
        disabled: date => date < new Date( (new Date()).setDate((new Date()).getDate() - 1) )// Disables past days
    }

    useEffect(() => {
        if(startDate !== null && endDate !== null){
            setIsOrdered('')
        }
    }, [startDate, endDate])

    const handleClickToObject = (event) => {
        event.preventDefault();

        let data = {
            about: commentText.current.value,
            time_from: timeFromInput.current.value,
            time_to: timeToInput.current.value,
            address: addressInput.current.value,
            payment_from: paymentToInput.current.value,
            payment_to: paymentFromInput.current.value,
            object_id: props.idProductPage,
            user_id: ctx.isUserId,
        }

        let booking = {
            date_from: moment(startDate).format('YYYY-MM-DD'),
            duration: (moment(endDate).format('DD') - moment(startDate).format('DD')) + 1,
        }

        if(startDate === null || endDate === null){
            setIsOrdered('Некорректная дата. Пожалуйста выберите дату')
        }else{
            fetch("https://cc19244api.tmweb.ru/order", {
                method: "POST",
                headers: {
                    'Accept': "application/json,",
                    'Content-Type': "application/json",
                    'Authorization': token,
                },
                body: JSON.stringify(data)

            })
                .then(response => response.json())
                .then(responseJson => {
                     console.log(responseJson);
                     if(responseJson.status === 201){
                         setIsOrdered('Заявка отправлена');
                         const setOrdered = setTimeout(() => setIsOrdered(''), 3000);
                         clearInterval(setOrdered);
                     }
                })

            fetch("https://cc19244api.tmweb.ru/booking", {
                method: "POST",
                headers: {
                    'Accept': "application/json,",
                    'Content-Type': "application/json",
                    'Authorization': token,
                },
                body: JSON.stringify(booking)

            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                })
        }

        event.target.reset();
    }

    return(
        <>
            <form className="modal__card modal__card3" onSubmit={handleClickToObject}>
                <h3 className="title">Подать заявку</h3>
                {isOrdered.length > 0 && <div className="respond_modal">{isOrdered}</div>}
                <div className="box">
                    <div className="left">
                        <div className="input dateInputPick">
                            <h6>Выбрать дату</h6>
                            <input type="input" className="datePick" placeholder='ДД/ММ/ГГ - ДД/ММ/ГГ'
                                   value={moment(startDate).format('YYYY-MM-DD') + ' - ' + moment(endDate).format('YYYY-MM-DD')}
                                   onClick={handleToggle}
                                   disabled
                            />
                            <ModalClickSvg className='modalClickCalendar' onClick={handleToggle} />
                        </div>
                        <div className="input">
                            <h6>Описание</h6>
                            <textarea
                                ref={commentText}
                            ></textarea>
                        </div>
                        <button className="modal__btn" type="submit">Подать заявку</button>
                    </div>
                    <div className="right">

                            <div className={!isToggle ? `left__inputs__modal` : 'dn'}>
                                <div className="input">
                                    <h6>Выбрать время</h6>
                                    <div className="input_box">
                                        <input  type="time" placeholder="От "
                                               ref={timeFromInput}
                                        />
                                        <input
                                            type="time" placeholder="До "
                                            ref={timeToInput}
                                        />
                                    </div>

                                </div>
                                <div className="input">
                                    <h6>Адрес</h6>
                                    <div className="input_wrap">
                                        <input type="text"
                                               ref={addressInput}
                                        />
                                        <ModalAddressSvg/>
                                    </div>
                                </div>
                                <div className="input">
                                    <h6>Оплата</h6>
                                    <div className="input_box">
                                        <input type="number" placeholder="От "
                                               ref={paymentFromInput}
                                        />
                                        <input type="number" placeholder="До "
                                               ref={paymentToInput}
                                        />
                                    </div>
                                </div>
                            </div>
                        {isToggle && <div className='Calendar__modal'>
                            <div className="calendar__p">
                                <p>Начальная дата: {startDate ? format(startDate, 'dd MMM yyyy', {locale: ru}) : 'Выберите дату'}.</p>
                                <p>Последний день: {endDate ? format(endDate, 'dd MMM yyyy', {locale: ru}) : 'Выберите дату'}.</p>
                            </div>
                            <DateRangePickerCalendar
                                startDate={startDate}
                                modifiers={modifiers}
                                endDate={endDate}
                                focus={focus}
                                onStartDateChange={setStartDate}
                                onEndDateChange={setEndDate}
                                onFocusChange={handleFocusChange}
                                locale={ru}
                            />
                        </div>
                        }
                    </div>
                </div>

            </form>
        </>
    )
}

export default ModalRequest;