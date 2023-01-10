import React, { useEffect, useState } from "react";
import { token } from "../App";

const AuthContext = React.createContext({
  isContactModal: false,
  isModal: false,
  isMobile: false,
  contactsHandleModal: () => {},
  closeModal: () => {},
  requestModal: () => {},
  setRerender: false,
  rerender: false,
  adsNumber: 0,
  isUserId: 0,
  userData: {},
  closeMobileAppModal: () => {},
  closeMobileModal: false,
  openAside: false,
});

export const AuthContextProvide = (props) => {
  const [isMobile, setIsMobile] = useState(false); // в зависимости от устройства пользователя
  const [isModal, setIsModal] = useState(false);
  const [isContactModal, setIsContactModal] = useState(false);
  const [isUserId, setUserId] = useState(0);
  const [userData, setUserData] = useState({});
  const [adsNumber, setAdsNumber] = useState(0);
  const [rerender, setRerender] = useState(false);
  const [closeMobileModal, setCloseMobileModal] = useState(false);
  const [openAside, setOpenAside] = useState(!isMobile);

  const toggleAside = () => {
    if (isMobile) {
      setOpenAside(!openAside);
    }
  };

  const contactsHandleModal = () => {
    setIsModal(true);
    setIsContactModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  const requestModal = () => {
    setIsModal(true);
    setIsContactModal(false);
  };
  const closeMobileAppModal = () => {
    setCloseMobileModal((prev) => !prev);
  };

  useEffect(() => {
    fetch("https://cc19244api.tmweb.ru/user/identity", {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setUserData(result.data);
        setUserId(result.data.id);
      });
  }, []);

  // useEffect(() => {
  //   fetch(`https://cc19244api.tmweb.ru/category?filter[depth]=0`, {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const adsNumber = result.data.map(
  //         (item) => +item.objectsCountByType
  //       );
  //       let reducer = adsNumber.reduce(function (sum, current) {
  //         return sum + current;
  //       }, 0);
  //       setAdsNumber(reducer);
  //     });
  // }, [rerender]);

  return (
    <AuthContext.Provider
      value={{
        isContactModal: isContactModal,
        isModal,
        isMobile,
        isUserId,
        userData,
        adsNumber,
        setRerender,
        rerender,
        closeMobileModal,
        contactsHandleModal,
        closeModal,
        requestModal,
        closeMobileAppModal,
        openAside,
        toggleAside,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
