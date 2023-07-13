"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

export default function UnAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // let hasTokenExpired = isTokenExpired();
    // if (!hasTokenExpired) {
    //   router.push("/dashboard");
    // }
    let token = getToken();
    setIsLoggedIn(token ? true : false);
    console.log("--on unauthlayout enter--", token);
    if (token) {
      let unauthUrls = ["/"];
      let currentUrl = router.asPath;
      console.log("--if token, current route--", currentUrl);
      console.log("--if token, router obj--", router);
      if (unauthUrls.includes(currentUrl)) {
        router.push("/dashboard");
        localStorage.setItem("path", "/dashboard");
      } else {
        router.push(currentUrl);
        // let path = getPath();
        // if (path) {
        //   router.push(path);
        // }
      }
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <Header />
        <main style={{ height: "calc(100vh - 64px)", padding: "16px" }}>
          {!isLoggedIn && children}
        </main>
      </ThemeProvider>
    </React.Fragment>
  );
}
