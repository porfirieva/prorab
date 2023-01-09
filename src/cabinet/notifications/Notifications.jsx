import { useEffect, useContext } from "react";
import { token } from "../../App";
import AuthContext from "../../store/auth-context";
import MobileNotifications from "./MobileNotifications";
import DesktopNotifications from "./DesktopNotifications";

const Notifications = () => {
  useEffect(() => {
    fetch(`https://cc19244api.tmweb.ru/category?filter[depth]=0`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
      });
  }, []);

  const ctx = useContext(AuthContext);
  return ctx.isMobile ? (
    <MobileNotifications />
  ) : (
    <DesktopNotifications />
  );
};

export default Notifications;
