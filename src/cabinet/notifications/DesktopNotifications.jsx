import s from "./style.module.scss";
import NotificationList from "./NotificationsItem";
import NotificationItem from "./NotificationsList";

const DesktopNotifications = () => {
  return (
    <>
      <NotificationList />
      <NotificationItem />
    </>
  );
};

export default DesktopNotifications;
