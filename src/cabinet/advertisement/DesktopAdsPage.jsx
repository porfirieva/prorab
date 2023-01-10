import { useState } from "react";

import TypeList from "./desktopPages/TypeList";
import AdsItems from "./desktopPages/AdsItems";
import EditAd from "./editAd/EditAd";
import CreateAds from "./createAds/CreateAds";
import PreviewAd from "./PreviewAd";

const DesktopAdsPage = ({ category }) => {
  const [type, setType] = useState(0);
  const [adId, setAdId] = useState(0);
  const [currentPage, setCurrentPage] = useState("MainPage");

  if (currentPage === "MainPage") {
    return (
      <div className="cabinet_ads">
        <div className="cabinet_ads__left">
          <button className="btn_save" onClick={() => setCurrentPage("CreateAdPage")}>
            Создать
          </button>
          <h6>Мои объявления</h6>
          <TypeList category={category} type={type} onTypeChange={setType} />
          <AdsItems type={type} onPageChange={setCurrentPage} getIdItem={setAdId} id={adId} />
        </div>
        <PreviewAd id={adId} onPageChange={setCurrentPage} />
      </div>
    );
  }
  if (currentPage === "CreateAdPage") {
    return <CreateAds category={category} type={type} onBack={setCurrentPage} onTypeChange={setType} />;
  }
  if (currentPage === "EditAdPage") {
    return <EditAd id={adId} onPageChange={setCurrentPage} type={type} />;
  }
};

export default DesktopAdsPage;