import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';
import PreviewAd from "../PreviewAd";

const PreviewAdPage = ({ onPageChange, id }) => {
  return (
    <div className='cabinet_ads mobile'>
      <div className="create_ads__back">
        <div className="create_ads__back" onClick={() => onPageChange("MainPage")}>
          <ArrowLeftIcon />
          Назад
        </div>
      </div>
      <PreviewAd id={id} onPageChange={onPageChange} />
    </div>
  )
}

export default PreviewAdPage;
