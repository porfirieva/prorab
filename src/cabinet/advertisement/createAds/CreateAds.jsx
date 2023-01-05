import '../../cabinet.sass'
import AdsTopLeft from "../AdsTopLeft";
import CreateAdsForm from "./CreateAdsForm";
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';

const CreateAds = ({ onNumberTypeChange, toggleCreateForm, numberType }) => {
    return (
        <div className="create_ads">
            <div className="create_ads__left">
                <div className="create_ads__back" onClick={toggleCreateForm}>
                    <ArrowLeftIcon />
                    Создать объявления
                </div>
                <AdsTopLeft numberType={numberType} onNumberTypeChange={onNumberTypeChange} />
            </div>
            <CreateAdsForm toggleCreateForm={toggleCreateForm} numberType={numberType} />
        </div>
    )
}

export default CreateAds;