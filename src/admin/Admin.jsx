import AdminAside from "./aside/AdminAside";
// import '../cabinet.sass'
import AdminInfo from "./main/AdminInfo";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AdminObjects from "./main/AdminObjects";
import AdminOneObject from "./main/AdminOneObject";
import AdminUsers from "./main/AdminUsers";
import AdminOneUser from "./main/AdminOneUser";
import AdminCategory from "./main/AdminCategory";
import AdminOneCategory from "./main/AdminOneCategory";
import AdminSupport from "./main/AdminSupport";
import AdminPromo from "./main/AdminPromo";
import AdminReports from "./main/AdminReports";
import AdminMailing from "./main/AdminMailing";
import AdminRoles from "./main/AdminRoles";
import AdminStatistic from "./main/AdminStatistic";
import { token } from "../App";
import AuthContext from "../store/auth-context";

const Admin = () => {
    const ctx = useContext(AuthContext);

    const [currentUser, setCurrentUser] = useState({});
    const [dataObjects, setDataObjects] = useState({});
    const [dataUsers, setDataUsers] = useState({});
    const [dataCategory, setDataCategory] = useState({});

    //данные авторизированного пользователя
    useEffect(() => {
        fetch("https://cc19244api.tmweb.ru/user/identity?mark=account", {
            method: "GET",
            crossDomain: true,
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setCurrentUser(result.data);
            });
    }, []);

    //данные  объявлений
    useEffect(() => {
        fetch("https://cc19244api.tmweb.ru/object?expand=user,city", {
            method: "GET",
            crossDomain: true,
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setDataObjects(result.data);
            });
    }, []);

    //данные всех пользователей
    useEffect(() => {
        fetch("https://cc19244api.tmweb.ru/user?expand=account", {
            method: "GET",
            crossDomain: true,
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setDataUsers(result.data);
            });
    }, []);

    //данные  категорий
    useEffect(() => {
        fetch("https://cc19244api.tmweb.ru/category?filter[depth]=0", {
            method: "GET",
            crossDomain: true,
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setDataCategory(result.data);
            });
    }, []);

    return (
        <section className="cabinet">
            <div className="cabinet__box">
                {ctx.openAside && <AdminAside data={currentUser} />}
                <div className="cabinet__content">
                    <button className="open-admin-menu" onClick={ctx.toggleAside}>
                        <div className="line">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        Меню
                    </button>
                    <Routes>
                        <Route path="/" element={<AdminInfo data={currentUser} />}></Route>
                        <Route path="/objects" element={<AdminObjects data={dataObjects} />}></Route>
                        <Route path="/objects/:id" element={<AdminOneObject />}></Route>
                        <Route path="/users" element={<AdminUsers data={dataUsers} />}></Route>
                        <Route path="/users/:id" element={<AdminOneUser />}></Route>
                        <Route path="/category" element={<AdminCategory data={dataCategory} />}></Route>
                        <Route path="/category/:id" element={<AdminOneCategory />}></Route>
                        {/* <Route
              path="/support"
              element={
                <AdminSupport
                  getRerender={getRerender}
                  data={dataUsers}
                />
              }></Route>
            <Route
              path="/promo"
              element={
                <AdminPromo
                  getRerender={getRerender}
                  data={dataUsers}
                />
              }></Route>
            <Route
              path="/reports"
              element={
                <AdminReports
                  getRerender={getRerender}
                  data={dataUsers}
                />
              }></Route>
            <Route
              path="/mailing"
              element={
                <AdminMailing
                  getRerender={getRerender}
                  data={dataUsers}
                />
              }></Route>
            <Route
              path="/roles"
              element={
                <AdminRoles
                  getRerender={getRerender}
                  data={dataUsers}
                />
              }></Route>
            <Route
              path="/statistic"
              element={
                <AdminStatistic
                  getRerender={getRerender}
                  data={dataUsers}
                />
              }></Route> */}
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default Admin;
