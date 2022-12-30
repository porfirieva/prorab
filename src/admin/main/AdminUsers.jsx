import { NavLink } from "react-router-dom";
import { url } from "../../components/catalog/specialEuipmentCatalog";

const AdminUsers = ({ data }) => {
  return (
    <div className="admin_users_container">
      <div className="admin_users_top">
        <form className="admin_users_search">
          <input
            className="admin_users_search-input"
            type="text"
            placeholder="Поиск"></input>
        </form>
        <div className="date">
          <div>date</div>
          <div>date</div>
        </div>
      </div>
      <div className="admin_users_titles">
        <p>ID</p>
        <p>Фото</p>
        <p className="admin_users_client">Клиент</p>
        <p>Зарегистрирован</p>
        <p>Телефон</p>
        {/* <p className="admin_users_posters">Объявлений</p>
        <p className="admin_users_requests">Заявок</p> */}
        <p className="admin_users_rating">Рейтинг</p>
      </div>
      <div className="admin_users_wrapper">
        {Object.keys(data).length > 0
          ? data.map((el) => (
              // <NavLink to={`${el.id}`}>
              <div key={el.id}>
                <div className="admin_users_content" key={el.id}>
                  <span>#{el.id}</span>
                  <img src={url + el.avatar} alt="user" />
                  <p>{el.name}</p>
                  <p>{el.account.created}</p>
                  <p>{el.phone}</p>
                  {/* <p>{el.posters}</p>
                  <p>{el.requests}</p> */}
                  <span className="rating">{el.mark}</span>
                  <div className="admin_users_content-icons">
                    <button>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7V9H17V7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7V9H9V7ZM12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17V14C11 13.7348 11.1054 13.4804 11.2929 13.2929C11.4804 13.1054 11.7348 13 12 13C12.2652 13 12.5196 13.1054 12.7071 13.2929C12.8946 13.4804 13 13.7348 13 14V17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18Z"
                          fill="#F13810"
                        />
                        <path
                          d="M17 9H7C6.20435 9 5.44129 9.31607 4.87868 9.87868C4.31607 10.4413 4 11.2044 4 12V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V12C20 11.2044 19.6839 10.4413 19.1213 9.87868C18.5587 9.31607 17.7956 9 17 9ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17V14C11 13.7348 11.1054 13.4804 11.2929 13.2929C11.4804 13.1054 11.7348 13 12 13C12.2652 13 12.5196 13.1054 12.7071 13.2929C12.8946 13.4804 13 13.7348 13 14V17Z"
                          fill="#FF7F63"
                        />
                      </svg>
                    </button>
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
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AdminUsers;
