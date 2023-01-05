import "normalize.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import MainPage from "./components/index/main";
import Catalog from "./components/catalog/catalogmain";
import SpecialEquipCatalog from "./components/catalog/specialEuipmentCatalog";
import CartProduct from "./components/catalog/CartProduct/CartProduct";
import Modal from "./UI/Modal/ModalOverlay";
import { AuthContextProvide } from "./store/auth-context";
import { useEffect, useState } from "react";
import About from "./components/about/About";
import Contacts from "./components/contacts/Contacts";
import LoginMain from "./components/login/LoginMain";
import CabinetMainPage from "./cabinet/mainPage/CabinetMainPage";
import Admin from "./admin/Admin";
import { Provider } from "react-redux";
import store from "./store/reduxStore";
import UserTerm from "./simplePages/UserTerm";
import MobileApp from "./UI/Modal/MobileApp";
import Privacy from "./simplePages/Privacy";

export let token = "Bearer " + localStorage.getItem("token");

const dates = {
  login: "89231817918",
  password: "1234",
};

fetch("http://cc19244api.tmweb.ru/user/login", {
  method: "POST",
  crossDomain: true,
  headers: {
    Accept: "application/json,",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(dates),
})
  .then((response) => response.json())
  .then((responseJson) => {
    // console.log(responseJson);
  });

const App = (props) => {
  const [userData, setUserData] = useState({});
  const [idProductPage, setIdProductPage] = useState([]);
  const [category, setCategory] = useState([]);
  const [getModal, setModal] = useState(false); // Мобильная модалка

  const onUserData = (data) => {
    setUserData(data);
  };

  const getIdPage = (data) => {
    setIdProductPage(data);
  };

  useEffect(() => {
    fetch("http://cc19244api.tmweb.ru/category?filter[depth]=0", {
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

  const getMobileAppModal = (modal) => {
    setModal(modal);
  };
  let data = getMobileAppModal;

  useEffect(() => {
    fetch("https://cc19244api.tmweb.ru/category?filter[depth]=0", {
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

  return (
    <div className="index_page">
      <AuthContextProvide>
        <MobileApp getMobileAppModal={getMobileAppModal} />

        <Header getModal={getModal} />

        <Modal userData={userData} idProductPage={idProductPage} />

        <main className="main">
          <Routes>
            {!localStorage.getItem("token") && (
              <Route path="*" element={<LoginMain />}></Route>
            )}
            {localStorage.getItem("token") && (
              <>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/catalog" element={<Catalog />}></Route>
                {category.map((item) => (
                  <Route
                    key={item.id}
                    path={`/catalog/type${item.type}`}
                    element={
                      <SpecialEquipCatalog
                        h1={item.title}
                        types={item.type}
                      />
                    }></Route>
                ))}
                <Route
                  path="/cart/:id"
                  element={
                    <CartProduct
                      onUserData={onUserData}
                      getIdPage={getIdPage}
                    />
                  }
                />
                <Route path="/about" element={<About />}></Route>
                <Route path="/contacts" element={<Contacts />}></Route>
                <Route path="/userTerm" element={<UserTerm />}></Route>
                <Route path="/privacy" element={<Privacy />}></Route>

                <Route
                  path="/lc/*"
                  element={<CabinetMainPage />}></Route>
                <Route path="/admin/*" element={<Admin />}></Route>
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </AuthContextProvide>
    </div>
  );
};

export default App;
