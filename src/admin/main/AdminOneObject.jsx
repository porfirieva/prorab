import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { token } from "../../App";
import { NavLink } from "react-router-dom";
import { url } from "../../components/catalog/specialEuipmentCatalog";

const AdminOneObject = () => {
  const params = useParams();
  const id = params.id;
  const [currentObject, setCurrentObject] = useState({});
  const [value, setValue] = useState({});

  function changeSelect(e) {
    setValue(e.target.value);
  }
  console.log(currentObject);

  useEffect(() => {
    fetch(`https://cc19244api.tmweb.ru/object/${id}?expand=city`, {
      method: "GET",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCurrentObject(result.data);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    let data = {
      status: value,
    };

    fetch(`https://cc19244api.tmweb.ru/object/${id}`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  const statuses = [
    "Ожидает подтверждения",
    "Подтверждено",
    "Отклонено",
    "Деактивировано пользователем",
    "Удалено пользователем",
  ];

  return (
    <div className="admin_one-object_container">
      <div className="admin_one-object_top">
        <div className="admin_one-object_top-left">
          <NavLink to="/admin/objects">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.25 5.24996H2.355L5.0775 1.97996C5.2048 1.8268 5.26605 1.62934 5.24777 1.43102C5.22948 1.2327 5.13316 1.04977 4.98 0.922463C4.82684 0.795159 4.62938 0.733912 4.43106 0.752197C4.23274 0.770482 4.0498 0.8668 3.9225 1.01996L0.1725 5.51996C0.147271 5.55576 0.124709 5.59336 0.105 5.63246C0.105 5.66996 0.105 5.69246 0.0525001 5.72996C0.0185052 5.81596 0.000705841 5.9075 0 5.99996C0.000705841 6.09243 0.0185052 6.18397 0.0525001 6.26996C0.0525001 6.30746 0.0524999 6.32996 0.105 6.36746C0.124709 6.40657 0.147271 6.44417 0.1725 6.47996L3.9225 10.98C3.99302 11.0646 4.08132 11.1327 4.18114 11.1794C4.28095 11.226 4.38982 11.2501 4.5 11.25C4.67524 11.2503 4.84507 11.1893 4.98 11.0775C5.05594 11.0145 5.11872 10.9372 5.16473 10.8499C5.21075 10.7627 5.2391 10.6672 5.24815 10.5689C5.25721 10.4707 5.2468 10.3717 5.21751 10.2775C5.18823 10.1832 5.14065 10.0957 5.0775 10.02L2.355 6.74996H11.25C11.4489 6.74996 11.6397 6.67094 11.7803 6.53029C11.921 6.38964 12 6.19887 12 5.99996C12 5.80105 11.921 5.61028 11.7803 5.46963C11.6397 5.32898 11.4489 5.24996 11.25 5.24996Z"
                fill="#858585"
              />
            </svg>
          </NavLink>
          <div>
            <h3>Объявление #{currentObject.id}</h3>
            <span>Дата регистрации: {currentObject.created}</span>
          </div>
        </div>
        <div className="admin_one-object_top-right">
          <button className="admin_del-btn">Удалить</button>
          <button className="admin_save-btn" onClick={submitHandler}>
            Сохранить
          </button>
          <NavLink to="/admin/objects">
            <button className="admin_block-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM20 12C20 13.8 19.4 15.5 18.3 16.9L7.1 5.7C10.6 3 15.6 3.6 18.3 7.1C19.4 8.5 20 10.2 20 12ZM4 12C4 10.2 4.6 8.5 5.7 7.1L16.9 18.3C13.4 21 8.4 20.4 5.7 16.9C4.6 15.5 4 13.8 4 12Z"
                  fill="white"
                />
              </svg>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="admin_one-object_bottom">
        <div className="admin_one-object_bottom-left">
          <p>{currentObject.type}</p>
          <p>{currentObject.type}</p>
          <p>{currentObject.name}</p>
          <p>{currentObject.model}</p>
          <p>
            {currentObject.price_1}
            <span>за час</span>
          </p>
          <p>
            {currentObject.price_2}
            <span>за смену</span>
          </p>
          <p>Свободные даты</p>
          <p className="admin_one-object_textfield">
            {currentObject.about}
          </p>
          <div className="admin_one-object_location">
            <p>location</p>
            {Object.keys(currentObject).length > 0 && (
              <p>{currentObject.city.name}</p>
            )}
            <p>location</p>
          </div>
        </div>
        <div className="admin_one-object_bottom-right">
          <p>
            <select>
              <option>{statuses[currentObject.status]}</option>
              {statuses.map((el) => {
                if (currentObject.status !== statuses.indexOf(el)) {
                  return <option>{el}</option>;
                }
              })}
            </select>
          </p>
          <div>
            <img src={url + currentObject.image} alt="obj" />
            <img src={url + currentObject.image} alt="obj" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOneObject;
