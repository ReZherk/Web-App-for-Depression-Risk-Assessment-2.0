import { useState } from "react";
import { NotificationContext } from "./NotificationContext";

export const NotificationProvider = ({ children }) => {
  const [hasNewEvaluation, setHasNewEvaluation] = useState(false);

  return (
    <NotificationContext.Provider value={{ hasNewEvaluation, setHasNewEvaluation }}>
      {children}
    </NotificationContext.Provider>
  );
};