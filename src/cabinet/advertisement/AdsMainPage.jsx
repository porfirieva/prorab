import "../cabinet.sass";
import TypeList from "./TypeList";
import AdsItems from "./AdsItems";
import PreviewAd from "./PreviewAd";
import { useState, useContext, useEffect } from "react";
import CreateAds from "./createAds/CreateAds";
import { token } from "../../App";
import AuthContext from "../../store/auth-context";
import MainPage from "./mobilePages/MainPage";
import PreviewAdPage from "./mobilePages/PreviewAdPage";
import ChooseTypePage from "./mobilePages/ChooseTypePage";
import CreateFormPage from "./mobilePages/CreateFormPage";
import EditAd from "./EditAd";

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
};

const DesktopAdsPage = ({ category }) => {
    const [type, setType] = useState(0);
    const [adId, setAdId] = useState(0);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(0);

    const toggleCreateForm = () => {
        setCreate((prevState) => !prevState);
    };

    if (create) {
        return <CreateAds category={category} type={type} onBack={toggleCreateForm} onTypeChange={setType} />;
    } else {
        if (edit) {
            return <EditAd id={edit} onBack={setEdit} type={type} />;
        } else {
            return (
                <div className="cabinet_ads">
                    <div className="cabinet_ads__left">
                        <button className="btn_save" onClick={toggleCreateForm}>
                            Создать
                        </button>
                        <h6>Мои объявления</h6>
                        <TypeList category={category} type={type} onTypeChange={setType} />
                        <AdsItems type={type} getIdItem={setAdId} id={adId} onEdit={setEdit} />
                    </div>
                    <PreviewAd id={adId} />
                </div>
            );
        }
    }
};

const AdsMainPage = (props) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch(`https://cc19244api.tmweb.ru/category?filter[depth]=0`, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setCategory(result.data);
            });
    }, []);

    const ctx = useContext(AuthContext);
    return ctx.isMobile ? <MobileAdsPage category={category} /> : <DesktopAdsPage category={category} />;
};

export default AdsMainPage;
