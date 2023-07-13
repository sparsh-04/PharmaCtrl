import { IStatusContextType } from "index/vm";
import * as React from "react";
import { useState } from "react";

type snackType = "success" | "warn" | "error" | "default";

export const StatusContext = React.createContext<IStatusContextType>({
  message: "",
  type: "",
  updateStatus: () => {},
});

const StatusProvider: React.FunctionComponent<any> = (props) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("default");

  const statusContext = React.useMemo(
    () => ({
      message: message,
      type: messageType,
      updateStatus: (message: string, type: snackType) => {
        setMessage(message);
        setMessageType(type);
      },
    }),
    [message,messageType]
  );
  return (
    <StatusContext.Provider value={statusContext}>
      {props.children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
