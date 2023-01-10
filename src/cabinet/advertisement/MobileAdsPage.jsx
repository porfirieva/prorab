import { useState } from "react";

import MainPage from "./mobilePages/MainPage";
import PreviewAdPage from "./mobilePages/PreviewAdPage";
import ChooseTypePage from "./mobilePages/ChooseTypePage";
import CreateFormPage from "./mobilePages/CreateFormPage";
import EditAd from "./editAd/EditAd";

const MobileAdsPage = ({ category }) => {
  const [currentPage, setCurrentPage] = useState("MainPage");
  const [type, setType] = useState(0);
  const [adId, setAdId] = useState(0);

  const onTypeChange = (type) => {
    setType(type);
  };
  const onIdItemChange = (id) => {
    setCurrentPage("PreviewAdPage");
    setAdId(id);
  };

  if (currentPage === "MainPage") {
    return (
      <MainPage
        category={category}
        type={type}
        onIdItemChange={onIdItemChange}
        onPageChange={setCurrentPage}
        onTypeChange={onTypeChange}
      />
    );
  }

  if (currentPage === "ChooseTypePage") {
    return <ChooseTypePage category={category} onTypeChange={onTypeChange} onPageChange={setCurrentPage} />;
  }

  if (currentPage === "CreateFormPage") {
    return <CreateFormPage type={type} onPageChange={setCurrentPage} />;
  }

  if (currentPage === "PreviewAdPage") {
    return <PreviewAdPage id={adId} onPageChange={setCurrentPage} />;
  }

  if (currentPage === "EditAdPage") {
    return <EditAd id={adId} onPageChange={setCurrentPage} />;
  }
};

export default MobileAdsPage;
