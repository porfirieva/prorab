import { NavLink } from "react-router-dom";
import { url } from "../../components/catalog/specialEuipmentCatalog";

const AdminCategory = ({ data }) => {
  return (
    <div className="admin_categories_container">
      <h3>Категории</h3>
      <div className="admin_categories_titles">
        <p>Фото</p>
        <p>Название</p>
        <p>Объявлений</p>
        <p>Подкатегорий</p>
      </div>
      <div className="admin_categories_wrapper">
        {Object.keys(data).length > 0
          ? data.map((el) => (
              <div className="admin_categories_content" key={el.id}>
                <img src={url + el.image} alt="category" />
                <p>{el.title}</p>
                <p>11</p>
                <p>111</p>
                <NavLink to={`${el.parent_id}`}>
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

export default AdminCategory;
