import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [hasNewEvaluation, setHasNewEvaluation] = useState(false);
  return (
    <NotificationContext.Provider
      value={{ hasNewEvaluation, setHasNewEvaluation }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
