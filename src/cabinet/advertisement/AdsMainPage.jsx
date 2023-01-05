import '../cabinet.sass'
import AdsTopLeft from "./AdsTopLeft";
import AdsItems from "./AdsItems";
import AdsRightItem from "./AdsRightItem";
import { useState } from "react";
import CreateAds from "./createAds/CreateAds";


const AdsMainPage = props => {
    const [numberType, setNumberType] = useState(0);
    const [idItem, setIdItem] = useState(0);
    const [create, setCreate] = useState(false)

    const numberTypeChange = type => {
        setNumberType(type);
    }

    const getIdItem = id => {
        setIdItem(id);
    }

    const toggleCreateForm = () => {
        setCreate(prevState => !prevState)
    }

    return create ? (
        <CreateAds
            numberType={numberType}
            toggleCreateForm={toggleCreateForm}
            onNumberTypeChange={numberTypeChange} />
    ) : (
        <div className="cabinet_ads">
            <div className="cabinet_ads__left">
                <button className="btn_save" onClick={toggleCreateForm}>Создать</button>
                <h6>Мои объявления</h6>

                <AdsTopLeft numberType={numberType} onNumberTypeChange={numberTypeChange} />
                <AdsItems numberType={numberType} getIdItem={getIdItem} />

            </div>

            <AdsRightItem idItem={idItem} />
        </div>
    )
}

export default AdsMainPage;