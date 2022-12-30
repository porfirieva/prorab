import "../admin.scss";
import { url } from "../../components/catalog/specialEuipmentCatalog";
import { useRef, useState } from "react";
import Input from "../../UI/Input";
import { token } from "../../App";
import FileInput from "../../cabinet/cabinetInfo/FileInput";
import axios from "axios";

const AdminInfo = ({ data }) => {
  const [imgAvatar, setImgAvatar] = useState(null);
  const [render, setRender] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [dataSuccess, setDataSuccess] = useState(false);

  // const inputEmail = useRef();
  const inputName = useRef();
  const inputPosition = useRef();
  const inputPassword = useRef();
  const inputPasswordNew = useRef();
  const inputPasswordConfirm = useRef();

  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => setIsShown(!isShown);

  const getImg = (selectedImg) => {
    setImgAvatar(selectedImg);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //меняем аватарку
    const formData = new FormData();
    formData.append("avatar", imgAvatar);
    if (imgAvatar) {
      axios
        .put(
          "https://cc19244api.tmweb.ru/user/identity-update",
          formData,
          {
            headers: {
              Accept: "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log("success" + res);
          setRender(true);
          data.getRerender(render);
        })
        .catch((err) => console.log(err));
    }

    // меняем свои имя и роль на странице админа
    let userData = {
      name: inputName.current.value,
      // account: {
      //   role: inputPosition.current.value,
      // },
    };
    fetch(
      "https://cc19244api.tmweb.ru/user/identity-update?expand=account",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(userData),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (!result.success) {
        } else {
          setDataSuccess(true);
        }
      });
  };

  const changePassword = () => {
    let data = {
      password: inputPassword.current.value,
      passwordNew: inputPasswordNew.current.value,
      passwordConfirm: inputPasswordConfirm.current.value,
    };

    fetch("https://cc19244api.tmweb.ru/user/change-password", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          setPasswordError(true);
        } else {
          setPasswordSuccess(true);
        }
      });
  };

  return (
    <div className={`admin_info_container ${isShown ? `grid` : ""}`}>
      <form
        className="person_data admin_info"
        encType="multipart/form-data"
        onSubmit={submitHandler}>
        <div>
          {data.avatar === null ? (
            <>
              <div className="person_img no_img">
                <FileInput getImg={getImg} />
              </div>
            </>
          ) : (
            <>
              <div className="person_img">
                {!imgAvatar && <img src={url + data.avatar} alt="" />}
                <FileInput getImg={getImg} />
              </div>
            </>
          )}
          <div className="box box_input admin_info_profile">
            <h6>Личная информация</h6>
            <Input
              classNameParent="input"
              type="text"
              placeholder=""
              defaultValue={data.name}
              ref={inputName}
            />
          </div>
          <div className="admin_info_email">
            <Input
              disabled
              type="email"
              src="/img/email.svg"
              classNameParent="input"
              // ref={inputEmail}
              defaultValue={data.email}
            />
            <span>Изменить e-mail</span>
          </div>
          <Input
            type="text"
            classNameParent="input"
            ref={inputPosition}
          />
          {dataSuccess && (
            <span className="admin__success ">
              Данные изменены успешно
            </span>
          )}
          <button className="btn_save">Сохранить</button>
          <button
            className="btn_change-password"
            onClick={togglePassword}>
            Изменить пароль
          </button>
        </div>
        <div className="admin_info_notification">
          <label>
            <input type="checkbox" id="checkbox"></input>
            <span></span>
          </label>
          <p>Получить уведомления</p>
        </div>
      </form>
      {isShown && (
        <div className="person_data admin_info_change">
          <h6>Изменить пароль</h6>
          <button onClick={changePassword} className="btn_save">
            Сохранить
          </button>
          <div className="admin_info_change_password-container">
            <Input
              type="text"
              classNameParent="input"
              ref={inputPassword}
              placeholder="Старый пароль"
            />
            <span>Забыли пароль?</span>
          </div>
          <Input
            type="text"
            classNameParent="input"
            ref={inputPasswordNew}
            placeholder="Новый пароль"
          />
          <Input
            type="text"
            classNameParent="input"
            ref={inputPasswordConfirm}
            placeholder="Повторить пароль"
          />
          {passwordError && (
            <p className="name__error">
              Введен некорректный старый пароль или пароли не
              совпадают
            </p>
          )}
          {passwordSuccess && (
            <p className="admin__success">Пароль успешно изменен</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminInfo;
