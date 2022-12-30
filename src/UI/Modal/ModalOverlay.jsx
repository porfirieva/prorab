import './Modal.sass'
import ModalContacts from "./ModalContacts";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";
import ModalRequest from "./ModalRequest";

const ModalOverlay = props => {
    const ctx = useContext(AuthContext);

    return(
        <>

            { ctx.isModal &&
            <div className="modal">
                <span className="modal_close" onClick={ctx.closeModal}></span>
                {ctx.isContactModal && <ModalContacts userData={props.userData} />}
                {!ctx.isContactModal && <ModalRequest idProductPage={props.idProductPage} />}
            </div>
            }
        </>
    )
}

export default ModalOverlay;