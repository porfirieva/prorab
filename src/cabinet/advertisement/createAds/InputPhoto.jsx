import '../../cabinet.sass'
import { ImageIcon } from '../../../components/icons/ImageIcon'
import { DeleteIcon } from '../../../components/icons/DeleteIcon'

const InputPhoto = ({ images, onLoad, onDelete, maxCount = 1, }) => {
    const handleMultipleImages = event => {
        let selectedFiles = [...event.target.files].slice(0, maxCount);
        onLoad(selectedFiles);
    }

    const deleteImg = (e, url) => {
        e.preventDefault();
        onDelete(images.filter(urls => urls !== url))
    }

    return (
        <div className="input_foto_wrap">
            <div className="input_foto_div">
                <input
                    accept="image/*"
                    type="file"
                    id='select_img'
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleMultipleImages}
                />
                <label htmlFor='select_img' className="input_foto">
                    <h5>
                        <ImageIcon />
                        Добавить фото
                    </h5>
                    <span>Вы можете добавить 1 фото</span>
                </label>
            </div>
            <div className="imagesMultiple">
                {images.map(file => {
                    return (
                        <div key={file.name}>
                            <img src={URL.createObjectURL(file)} alt='' />
                            <button onClick={(e) => deleteImg(e, file)}>
                                <DeleteIcon />
                            </button>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default InputPhoto;