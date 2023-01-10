import TypeList from "../desktopPages/TypeList";
import AdsItems from "../desktopPages/AdsItems";

const MainPage = ({ category, onPageChange, type, onTypeChange, onIdItemChange }) => {
  return (
    <div className="cabinet_ads__left">
      <button className="btn_save" onClick={() => onPageChange("ChooseTypePage")}>Создать</button>
      <h6>Мои объявления</h6>

      <TypeList category={category} type={type} onTypeChange={onTypeChange} />
      <AdsItems type={type} getIdItem={onIdItemChange} />

    </div>
  )
}

export default MainPage;
