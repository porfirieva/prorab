import '../../cabinet.sass'
import { url } from "../../../components/catalog/specialEuipmentCatalog";


const TypeList = ({ onTypeChange, type, category }) => {
    return (
        <div className="top">
            {category.map(item =>
                <div key={item.id}
                    className={`item ${type === item.type ? 'active' : ''}`}
                    onClick={() => onTypeChange(item.type)}
                >
                    <div className="img">
                        <img src={url + item.image} alt="" />
                    </div>
                    <div>
                        <h5 className="title">{item.title}</h5>
                        <p>Объявлений: {item.objectsCountByType}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TypeList;