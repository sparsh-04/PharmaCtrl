"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Header from "./Header";
import {
  getPath,
  getToken,
  isTokenExpired,
} from "index/services/util/UtilService";
import { ThemeProvider } from "@mui/material";
import { THEME } from "index/utils/Styles";
import StatusProvider from "../../providers/StatusProvider";
import Footer from "./Footer";
import SideMenuManageProvider from "index/providers/SideMenuManageProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ConfirmDialogProvider } from "index/providers/ConfirmDialogProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // let hasTokenExpired = isTokenExpired();
    // if (hasTokenExpired) {
    //   router.push("/");
    // }
    let token = getToken();
    if (!token) {
      console.log("--if no token--,router obj", router);
      router.push("/");
    } else {
      console.log("--if token available--,router obj", router);
      let currentUrl = router.asPath;
      router.push(currentUrl);
      // let path = getPath();
      // if (path) {
      //   router.push(path);
      // }
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={THEME}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StatusProvider>
            <SideMenuManageProvider>
              <ConfirmDialogProvider>
                <CssBaseline />
                <Header />
                <main className="main-container">
                  {children}
                </main>
                <Footer />
              </ConfirmDialogProvider>
            </SideMenuManageProvider>
          </StatusProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
