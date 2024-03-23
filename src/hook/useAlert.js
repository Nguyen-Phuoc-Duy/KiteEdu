import { useAlert as useReactAlert } from "react-alert";

const useAlert = () => {
  const alert = useReactAlert();

  const alertSync = async (title, message, btnCancel = true) => {
    return new Promise((resolve, reject) => {
      let btn = [
        {
          text: "Yes",
          onClick: () => {
            resolve(true);
          },
        },
      ];
      if (btnCancel) {
        btn.push({
          text: "Cancel",
          onClick: () => {
            resolve(false);
          },
        });
      }
      alert.show(title, {
        title: message,
        actions: btn,
      });
    });
  };

  const alertAsync = async (title, message) => {
    return new Promise((resolve, reject) => {
      alert.show(title, {
        title: message,
        actions: [
          {
            text: "OK",
            onClick: () => {
              resolve();
            },
          },
        ],
      });
    });
  };

  return { alertSync, alertAsync };
};

export default useAlert;
