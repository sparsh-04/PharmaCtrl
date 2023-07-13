import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import { ILogin } from "index/vm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import { setToken } from "index/services/util/UtilService";
import { getCompanyName, loginToApp } from "index/services/auth/AuthService";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { COLOR_WHITE, FOOTER_COLORS, PRIMARY_COLOR } from "index/Constant";
import Loading from "../common/Loading";
import AppButton from "index/shared/inputs/AppButton";

interface LoginComponentProps {
  handleClose?: Function;
  submitText?: string;
  netWorkId?: string;
  groupName?: string;
  roleName?: string
}

const LoginComponent: React.FunctionComponent<LoginComponentProps> = ({ handleClose, submitText, netWorkId, groupName, roleName }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCompany = async () => {
    let result = await getCompanyName();
    if (result && result?.errorNo === 0) {
      setCompanyName(result.resultMessage);
      setErrorMessage("");
      localStorage.setItem("company", result.resultMessage);
    } else {
      setErrorMessage(result?.resultMessage);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loading message="loading.." />}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={handleClose ? 12 : 6} lg={handleClose ? 12 : 4}>
          <Card variant="outlined" className={`${handleClose ? 'no-border' : ''}`}>
            {!handleClose && (
              <CardHeader
                title="Login"
                sx={{ backgroundColor: PRIMARY_COLOR, color: COLOR_WHITE }}
              />
            )}
            <CardContent>
              <Formik
                initialValues={{
                  networkid: netWorkId || "",
                  password: "",
                  Company: companyName,
                }}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.networkid) {
                    errors.networkid = "User ID is Required";
                  }
                  if (!values.password) {
                    errors.password = "Password is Required";
                  }
                  return errors;
                }}
                onSubmit={async (values: ILogin, { setSubmitting }) => {
                  setLoading(true);
                  let result = await loginToApp({
                    ...values,
                    Company: companyName,
                  });
                  if (result && result.errorNo === 0) {
                    setToken(
                      (result && result?.resultMessage) || "",
                      values.networkid
                    );
                    localStorage.setItem("company", companyName);
                    setLoading(false);
                    setErrorMessage("");
                    if (result.dTable?.length > 0) {
                      let loggedInUserDetails = result.dTable;
                      let loggedInUserRoleDetails = loggedInUserDetails;

                      if (handleClose) {
                        if (groupName) {
                          loggedInUserRoleDetails = loggedInUserRoleDetails.filter(user => {
                            return user.useR_GROUP == groupName
                          });
                        }
                        if (roleName) {
                          loggedInUserRoleDetails = loggedInUserRoleDetails.filter(user => {
                            return user.useR_ROLE == roleName
                          });
                        }
                        if (loggedInUserRoleDetails.length > 0) {
                          let loggedInDetails = loggedInUserRoleDetails[0];
                          handleClose(loggedInDetails)
                        } else {
                          setErrorMessage("Invalid credentials.");
                        }
                      } else {
                        let loggedInDetails = loggedInUserRoleDetails[0];
                        let loggedInUser = `${loggedInDetails.firstName} ${loggedInDetails.lastName}`
                        if (!handleClose) {
                          localStorage.setItem("networkid", loggedInUser);
                          localStorage.setItem("loggedInUser", JSON.stringify(loggedInDetails));
                        }
                        router.push("/dashboard");
                        localStorage.setItem("path", "/dashboard");
                      }
                    }
                  } else {
                    setErrorMessage(result?.resultMessage);
                    setLoading(false);
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {groupName && (
                      <AppTextInput
                        name="groupName"
                        label="Group Name"
                        value={groupName}
                        disabled={true}
                      />
                    )}
                    {roleName && (
                      <AppTextInput
                        name="roleName"
                        label="Role"
                        value={roleName}
                        disabled={true}
                      />
                    )}
                    <AppTextInput
                      name="networkid"
                      label="User ID*"
                      onChange={handleChange}
                      placeholder=" "
                      onBlur={handleBlur}
                      value={values.networkid}
                      disabled={netWorkId ? true : false}
                      error={
                        errors.networkid && touched.networkid ? true : false
                      }
                      errorText={
                        errors.networkid && touched.networkid
                          ? errors.networkid
                          : ""
                      }
                    />
                    <AppTextInput
                      name="password"
                      label="Password*"
                      onChange={handleChange}
                      type="password"
                      placeholder=" "
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password && touched.password ? true : false}
                      errorText={
                        errors.password && touched.password
                          ? errors.password
                          : ""
                      }
                    />
                    {!handleClose && (
                      <AppTextInput
                        name="Company"
                        label="Company*"
                        onChange={handleChange}
                        disabled={true}
                        placeholder=" "
                        onBlur={handleBlur}
                        value={companyName}
                        error={errors.Company && touched.Company ? true : false}
                        errorText={
                          errors.Company && touched.Company ? errors.Company : ""
                        }
                      />
                    )}
                    {errorMessage && (
                      <Typography
                        variant="caption"
                        color={FOOTER_COLORS["error"]}
                      >
                        {errorMessage}
                      </Typography>
                    )}
                    <br />
                    <br />
                    <Grid justifyContent={"center"} container>
                      <Grid item>
                        <AppButton
                          btnText={`${submitText || 'Login'}`}
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                        />
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginComponent;
