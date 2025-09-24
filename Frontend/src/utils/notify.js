import { notification } from "antd";

export const notifySuccess = (messageText, description = "") => {
  notification.success({
    message: messageText,
    description,
    placement: "topRight",
  });
};

export const notifyError = (messageText, description = "") => {
  notification.error({
    message: messageText,
    description,
    placement: "topRight",
  });
};
