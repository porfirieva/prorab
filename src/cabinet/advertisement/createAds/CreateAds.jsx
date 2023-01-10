import '../../cabinet.sass'
import TypeList from "../desktopPages/TypeList";
import CreateAdsForm from "./CreateAdsForm";
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';

const CreateAds = ({ onTypeChange, onBack, type, category }) => {
    return (
        <div className="create_ads">
            <div className="create_ads__left">
                <div className="create_ads__back" onClick={() => onBack("MainPage")}>
                    <ArrowLeftIcon />
                    Создать объявления
                </div>
                <TypeList category={category} type={type} onTypeChange={onTypeChange} />
            </div>
            <CreateAdsForm onSuccess={onBack} type={type} />
        </div>
    )
}

export default CreateAds;