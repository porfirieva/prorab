import { NavLink } from "react-router-dom";
import { url } from "../../components/catalog/specialEuipmentCatalog";

const AdminObjects = ({ data }) => {
  return (
    <div className="admin_objects_container">
      <div className="admin_objects_top">
        <form className="admin_objects_search">
          <input
            className="admin_objects_search-input"
            type="text"
            placeholder="Поиск"></input>
        </form>
        <div className="date">
          <div>date</div>
          <div>date</div>
        </div>
      </div>
      <div className="admin_objects_titles">
        <p>ID</p>
        <p>Фото</p>
        <p>Название</p>
        <p>Изменено</p>
        <p>Автор объявления</p>
        <p>Цена</p>
        <p>Место</p>
        <p>Статус</p>
      </div>
      <div className="admin_objects_wrapper">
        {Object.keys(data).length > 0
          ? data.map((el) => (
              <div className="admin_objects_content" key={el.id}>
                <span>#{el.id}</span>
                <img src={url + el.image} alt="object" />
                <p>{el.name}</p>
                <p>{el.updated}</p>
                <div>
                  <p>{el.user.name}</p>
                  <p>{el.user.phone}</p>
                </div>
                <p>{el.price_1}</p>
                <p>{el.city.name}</p>
                {console.log(el)}
                {/* {разобраться со статусами статус и статус эктив} */}
                {el.status == 0 ? (
                  <p className="admin_waiting">
                    Ожидает подтверждения
                  </p>
                ) : el.status == 1 ? (
                  <p className="admin_done">Подтверждено</p>
                ) : el.status == 2 ? (
                  <p className="admin_rejected">Отклонено</p>
                ) : el.status == 3 ? (
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
  );
};

export default AdminObjects;
