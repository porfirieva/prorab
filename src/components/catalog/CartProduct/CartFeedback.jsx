import './CartProduct.sass';
import moment from 'moment';


const CartFeedback = props => {
    const url = 'http://cc19244api.tmweb.ru/uploads/';

    const lengthFeedback = props.feedback.length;

    return(
        <>
            {lengthFeedback > 0 &&
                <section className="feedback">
                    <div className="container">
                        <div className="feedback_all_titles__flex">
                            <h2 className="title_h3">Отзывы</h2>
                            <a href="#">Все</a>
                        </div>
                        <div className="feedback__box">

                            {props.feedback.map(item =>
                                <div key={item.id} className="feedback__wrap">
                                    <div className="feedback__block">
                                        <div className="top">
                                            <div className="person">
                                                <div className="img">
                                                    <img src={url + props.userId.filter(user => user.id === item.id).map(item => item.avatar)} alt=""/>
                                                </div>
                                                <div>
                                                    <p className="name">{props.userId.filter(user => user.id === item.id).map(item => item.name)}</p>
                                                    <p className="date">{moment(item.date).format("DD/MM/YYYY").split('/').join('.')}</p>
                                                </div>
                                            </div>

                                            <div className="stars">
                                                {
                                                    [...Array(item.mark)].map((v, i) =>
                                                        <div key={i} className="star active">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path
                                                                    d="M13.4392 4.52991H13.4366H9.48277L8.25957 0.739314C8.11748 0.298454 7.70959 0 7.24954 0C7.24954 0 7.24954 0 7.24928 0C6.78926 0 6.38161 0.298695 6.23925 0.739555L5.01761 4.5299H1.06229C0.602003 4.5299 0.194356 4.82859 0.0519991 5.26975C-0.0901185 5.71059 0.0657382 6.1938 0.438128 6.46638L3.63834 8.80868L2.41644 12.5988C2.27434 13.0399 2.4302 13.5231 2.8023 13.7956C2.9885 13.9318 3.20761 14 3.42673 14C3.64586 14 3.86497 13.9318 4.05115 13.7956L7.25112 11.4528L10.4524 13.7956C10.6386 13.9318 10.8574 14 11.0766 14C11.2957 14 11.5148 13.9318 11.701 13.7954C12.0734 13.5228 12.229 13.0396 12.0866 12.5985L10.8634 8.80762L14.039 6.48232C14.3175 6.2892 14.5 5.96617 14.5 5.60034C14.5001 5.0092 14.0257 4.52991 13.4392 4.52991Z"
                                                                    fill="#F9B023"/>
                                                            </svg>
                                                        </div>)
                                                }
                                                {
                                                    [...Array(5 - item.mark)].map((v, i) =>
                                                        <div key={i} className="star notactive">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path
                                                                    d="M13.4392 4.52991H13.4366H9.48277L8.25957 0.739314C8.11748 0.298454 7.70959 0 7.24954 0C7.24954 0 7.24954 0 7.24928 0C6.78926 0 6.38161 0.298695 6.23925 0.739555L5.01761 4.5299H1.06229C0.602003 4.5299 0.194356 4.82859 0.0519991 5.26975C-0.0901185 5.71059 0.0657382 6.1938 0.438128 6.46638L3.63834 8.80868L2.41644 12.5988C2.27434 13.0399 2.4302 13.5231 2.8023 13.7956C2.9885 13.9318 3.20761 14 3.42673 14C3.64586 14 3.86497 13.9318 4.05115 13.7956L7.25112 11.4528L10.4524 13.7956C10.6386 13.9318 10.8574 14 11.0766 14C11.2957 14 11.5148 13.9318 11.701 13.7954C12.0734 13.5228 12.229 13.0396 12.0866 12.5985L10.8634 8.80762L14.039 6.48232C14.3175 6.2892 14.5 5.96617 14.5 5.60034C14.5001 5.0092 14.0257 4.52991 13.4392 4.52991Z"
                                                                    fill="#F9B023"/>
                                                            </svg>
                                                        </div>)
                                                }

                                            </div>
                                        </div>
                                        <p className="text">{item.comment}</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default CartFeedback;