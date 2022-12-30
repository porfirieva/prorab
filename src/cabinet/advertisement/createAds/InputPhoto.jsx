import '../../cabinet.sass'
import {useState} from "react";

const InputPhoto = props => {
    const [images, setImages] = useState([]);

    const handleMultipleImages = event => {
        const selectedFiles = [];
        const targetFiles = event.target.files;
        const targetFilesObject = [...targetFiles];
        targetFilesObject.map(file => {
            return selectedFiles.push(URL.createObjectURL(file))
        })
        setImages(selectedFiles);
    }

    return(
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
                            <path
                                d="M25.6 13.8C25.2532 13.5421 24.8326 13.4029 24.4004 13.4029C23.9682 13.4029 23.5476 13.5421 23.2008 13.8L18.1464 17.5896L11.4704 9.3824L11.3872 9.2904C11.024 8.92666 10.5345 8.71694 10.0206 8.70487C9.50668 8.6928 9.00791 8.87931 8.628 9.2256L2.4 16.0912V4.2776C2.40064 3.77982 2.59866 3.30262 2.95064 2.95064C3.30262 2.59866 3.77982 2.40064 4.2776 2.4H27.7224C28.2202 2.40064 28.6974 2.59866 29.0494 2.95064C29.4013 3.30262 29.5994 3.77982 29.6 4.2776V16.8L25.6 13.8ZM27.7224 0H4.2776C3.14344 0.00105908 2.05603 0.452074 1.25405 1.25405C0.452074 2.05603 0.00105907 3.14344 0 4.2776V23.7224C0.00105907 24.8566 0.452074 25.944 1.25405 26.746C2.05603 27.5479 3.14344 27.9989 4.2776 28H27.7224C28.8566 27.9989 29.944 27.5479 30.746 26.746C31.5479 25.944 31.9989 24.8566 32 23.7224V4.2776C31.9989 3.14344 31.5479 2.05603 30.746 1.25405C29.944 0.452074 28.8566 0.00105908 27.7224 0ZM24 7.6C23.7898 7.60005 23.5817 7.6415 23.3876 7.72198C23.1934 7.80245 23.017 7.92038 22.8685 8.06903C22.7199 8.21768 22.602 8.39413 22.5217 8.58832C22.4413 8.78251 22.3999 8.99063 22.4 9.2008C22.4001 9.41097 22.4415 9.61907 22.522 9.81322C22.6025 10.0074 22.7204 10.1838 22.869 10.3323C23.0177 10.4809 23.1941 10.5988 23.3883 10.6791C23.5825 10.7595 23.7906 10.8009 24.0008 10.8008C24.4253 10.8007 24.8323 10.632 25.1323 10.3318C25.4324 10.0316 25.6009 9.62445 25.6008 9.2C25.6007 8.77555 25.432 8.36852 25.1318 8.06846C24.8316 7.76841 24.4245 7.59989 24 7.6Z"
                                fill="#546EDB"/>
                        </svg>
                        Добавить фото
                    </h5>
                    <span>Вы можете добавить 1-3  фото</span>
                </label>
            </div>
            <div className="imagesMultiple">
                {images.map(url => {
                    return(
                        <img src={url} alt=''/>
                    )
                })}
            </div>
        </div>
    )
}

export default InputPhoto;