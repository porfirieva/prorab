import "../cabinet.sass";
import CabinetAside from "./CabinetAside";
import CabinetInfo from "../cabinetInfo/CabinetInfo";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { token } from "../../App";
import AdsMainPage from "../advertisement/AdsMainPage";
import { useSelector } from "react-redux";
import Notifications from "../notifications/Notifications";

const CabinetMainPage = () => {
  const [dataUser, setDataUser] = useState({});
  const [render, setRender] = useState(false);
  const ctx = useContext(AuthContext);

  const getRerender = () => {
    setRender((rerun) => !rerun);
  };

  useEffect(() => {
    fetch("https://cc19244api.tmweb.ru/user/identity", {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setDataUser(result.data);
      });
  }, [render]);

  return (
    <section className="cabinet">
      <div className="cabinet__box">
        {ctx.openAside && <CabinetAside data={dataUser} />}
        {/* <CabinetAside data={dataUser} /> */}
        <div className="cabinet__content">
          <button
            className="open-admin-menu"
            onClick={ctx.toggleAside}>
            <div className="line">
              <span></span>
              <span></span>
              <span></span>
            </div>
            Меню
          </button>
          <Routes>
            <Route
              path="/"
              element={
                <CabinetInfo
                  getRerender={getRerender}
                  data={dataUser}
                />
              }></Route>
            <Route
              path="/advertisement"
              element={<AdsMainPage />}></Route>
            <Route
              path="/notifications"
              element={<Notifications />}></Route>
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default CabinetMainPage;
