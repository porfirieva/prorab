import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { token } from "../../App";
import { url } from "../../components/catalog/specialEuipmentCatalog";
import { NavLink } from "react-router-dom";

const AdminOneObject = () => {
  const params = useParams();
  const id = params.id;
  const [currentUser, setCurrentUser] = useState({});
  const [currentObjects, setCurrentObjects] = useState({});
  // console.log(currentObjects);

  useEffect(() => {
    fetch(`https://cc19244api.tmweb.ru/user/${id}?expand=account`, {
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

  //пытаюсь удалить страницу выбранного юзера
  // useEffect(() => {
  //   fetch(`https://cc19244api.tmweb.ru/user/${id}?expand=account`, {
  //     method: "DELETE",
  //     crossDomain: true,
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setCurrentUser(result.data);
  //     });
  // }, []);

  useEffect(() => {
    fetch(
      `https://cc19244api.tmweb.ru/object?filter[user_id]=${id}&expand=city, category`,
      {
        method: "GET",
        crossDomain: true,
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setCurrentObjects(result.data);
      });
  }, []);

  return (
    <div className="admin_one-user_container">
      <div className="admin_one-user_card">
        <div className="admin_one-user_card-top">
          <div>
            <div className="admin_one-user_back">
              <NavLink to="/admin/users">
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
              <h3>{currentUser.name}</h3>
              {currentUser.mark === null ? (
                <span className="rating  no-rating">
                  Нет рейтинга
                </span>
              ) : (
                <span className="rating">{currentUser.mark}</span>
              )}
            </div>
            {/* падает ошибка андефайнд <p>Дата регистрации: {currentUser.account.created}</p> */}
          </div>
          <div className="admin_one-user_btns">
            <button className="admin_del-btn">Удалить</button>
            <button className="admin_save-btn">Сохранить</button>
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
          </div>
        </div>
        {currentUser.avatar === null ? (
          <div className="admin_one-user_photo no-avatar">
            Нет фото
          </div>
        ) : (
          <div className="admin_one-user_photo">
            <img src={url + currentUser.avatar} alt="user" />
          </div>
        )}
        <div className="admin_one-user_card-bottom">
          <div className="admin_one-user_data-left">
            <span>Имя / ИП / ООО</span>
            <p className="admin_data-user">{currentUser.name}</p>
          </div>
          <div className="admin_one-user-contacts admin_data-wa">
            <p>{currentUser.phone}</p>
          </div>

          <div className="admin_one-user_data-left">
            <span>E-mail</span>
            <p className="admin_data-user">{currentUser.email}</p>
          </div>
          <div className="admin_one-user-contacts admin_data-tg">
            <p>{currentUser.phone}</p>
          </div>

          <div className="admin_one-user_data-left">
            <span>Номер телефона</span>
            <p className="admin_data-user">{currentUser.phone}</p>
          </div>
          <div className="admin_one-user-contacts admin_data-vb">
            <p>{currentUser.phone}</p>
          </div>
        </div>
      </div>
      <div className="admin_one-user_posters">
        <div className="admin_users_container">
          <div className="admin_objects_titles">
            <p>ID</p>
            <p>Фото</p>
            <p>Категория</p>
            <p>Название</p>
            <p>Изменено</p>
            <p>Автор объявления</p>
            <p>Место</p>
            <p>Статус</p>
          </div>
          <div className="admin_objects_wrapper">
            {currentObjects.length > 0
              ? currentObjects.map((el) => (
                  <div className="admin_objects_content" key={el.id}>
                    <span>#{el.id}</span>
                    <img src={url + el.image} alt="object" />
                    <p>{el.category.title}</p>
                    <p>{el.name}</p>
                    <p>{el.updated}</p>
                    <p>{el.city.name}</p>
                    {el.status === 0 ? (
                      <p className="admin_waiting">
                        Ожидает подтверждения
                      </p>
                    ) : el.status === 1 ? (
                      <p className="admin_done">Подтверждено</p>
                    ) : el.status === 2 ? (
                      <p className="admin_rejected">Отклонено</p>
                    ) : el.status === 3 ? (
                      <p className="admin_deactive">
                        Деактивировано пользователем
                      </p>
                    ) : (
                      <p className="admin_delete">
                        Удалено пользователем
                      </p>
                    )}
                    <NavLink to={`${el.id}`}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 5C6.80078 5 4.30859 6.90625 1.25 10C3.88281 12.6445 6.09375 15 10 15C13.9023 15 16.7734 12.0156 18.75 10.0547C16.7266 7.75781 13.8594 5 10 5ZM10 13.5664C8.07031 13.5664 6.5 11.9648 6.5 10C6.5 8.03125 8.07031 6.43359 10 6.43359C11.9297 6.43359 13.5 8.03516 13.5 10C13.5 11.9688 11.9297 13.5664 10 13.5664Z"
                          fill="#4088DD"
                        />
                        <path
                          d="M10 8.75C10 8.44141 10.1133 8.16016 10.2969 7.94141C10.1992 7.92578 10.1016 7.91797 10 7.91797C8.875 7.91797 7.95703 8.85156 7.95703 10C7.95703 11.1484 8.875 12.082 10 12.082C11.125 12.082 12.043 11.1484 12.043 10C12.043 9.91016 12.0352 9.82031 12.0273 9.73047C11.8125 9.89844 11.5469 10 11.2539 10C10.5586 10 10 9.44141 10 8.75Z"
                          fill="#4088DD"
                        />
                      </svg>
                    </NavLink>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOneObject;
