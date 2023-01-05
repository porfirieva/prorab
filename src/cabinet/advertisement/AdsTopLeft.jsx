import '../cabinet.sass'
import { useEffect, useState } from "react";
import { token } from "../../App";
import { url } from "../../components/catalog/specialEuipmentCatalog";


const AdsTopLeft = ({ onNumberTypeChange, numberType }) => {
    const [category, setCategory] = useState([]);

    const activeHandler = id => {
        onNumberTypeChange(id);
    }

    useEffect(() => {
        fetch(`https://cc19244api.tmweb.ru/category?filter[depth]=0`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then((result) => {
                setCategory(result.data);
            })
    }, []);

    return (
        <div className="top">
            {category.map(item =>
                <div key={item.id}
                    className={`item ${numberType === item.type ? 'active' : ''}`}
                    onClick={() => activeHandler(item.type)}
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

export default AdsTopLeft;