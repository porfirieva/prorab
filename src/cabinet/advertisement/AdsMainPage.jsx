import '../cabinet.sass'
import AdsTopLeft from "./AdsTopLeft";
import AdsItems from "./AdsItems";
import AdsRightItem from "./AdsRightItem";
import {useState} from "react";
import CreateAds from "./createAds/CreateAds";


const AdsMainPage = props => {
    const [numberType, setNumberType] = useState(1);
    const [idItem, setIdItem] = useState(0);
    const [create, setCreate] = useState(false)

    const getNumberType = type => {
        setNumberType(type);
    }

    const getIdItem = id => {
        setIdItem(id);
    }

    const createAdsHandler = () => {
        setCreate(prevState => !prevState)
    }

    const infoAds = <div className="cabinet_ads">
        <div className="cabinet_ads__left">
            <button className="btn_save" onClick={createAdsHandler}>Создать</button>
            <h6>Мои объявления</h6>

            <AdsTopLeft getNumberType={getNumberType}/>
            <AdsItems numberType={numberType} getIdItem={getIdItem}/>

        </div>

        <AdsRightItem idItem={idItem}/>
    </div>

    return(
        <>
            {!create && infoAds}
            {create &&  <CreateAds numberType={numberType}
                                   createAdsHandler={createAdsHandler}
                                   getNumberType={getNumberType}/>}
        </>
    )
}

export default AdsMainPage;