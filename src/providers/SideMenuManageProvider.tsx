import { ISideMenuManageContextType } from "index/vm";
import * as React from "react";
import { useState, useEffect } from "react";

export const SideMenuManageContext =
  React.createContext<ISideMenuManageContextType>({
    open: false,
    selectedMenuGroup: "",
    menuGroups:[],
    updateOpenStats: () => {},
    updateSelectedMenuGroup: () => {},
    updateMenuGroups: () => {},
  });

const SideMenuManageProvider: React.FunctionComponent<any> = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedMenuGroup, setSelectedMenuGroup] = useState("");
  const [menuGroups, setMenuGroups] = useState<any[]>([]);

  useEffect(() => {
    let selectedMenuGroupFromLocal = localStorage.getItem("selectedMenuGroup");
    if (selectedMenuGroupFromLocal) {
      setSelectedMenuGroup(selectedMenuGroupFromLocal);
    }
  }, []);

  const sidemenuManageContext = React.useMemo(
    () => ({
      open,
      selectedMenuGroup,
      menuGroups,
      updateOpenStats: (isOpen: boolean) => {
        setOpen(isOpen);
      },
      updateSelectedMenuGroup: (item: string) => {
        setSelectedMenuGroup(item);
      },
      updateMenuGroups: (data:any[])=>{
        setMenuGroups(data)
      }
    }),
    [open, selectedMenuGroup, menuGroups]
  );
  return (
    <SideMenuManageContext.Provider value={sidemenuManageContext}>
      {props.children}
    </SideMenuManageContext.Provider>
  );
};

export default SideMenuManageProvider;
