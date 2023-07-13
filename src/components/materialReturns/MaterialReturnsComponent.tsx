import {
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { IMaterialReturns } from "index/vm";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface MaterialReturnsComponentProps {}

const MaterialReturnComponent: React.FunctionComponent<
  MaterialReturnsComponentProps
> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [order, setOrder] = useState(true);
  const menuItems = [
    {
      value: "Approved",
    },
    {
      value: "Hold",
    },
    {
      value: "In process",
    },
    {
      value: "Released",
    },
    {
      value: "Test 2",
    },
  ];
  const menu = [{ value: "ABC" }];
  return (
    <>
      <h2 className="header-margin">Material Returns</h2>
      <Card>
        <Grid container spacing={0} padding={2}>
          <Grid item xs={12}>
            <Formik
              initialValues={
                {
                  order: "",
                  containerId: "",
                  workOrder: "",
                  materialDispatchNoteId: "",
                  line: "",
                  createdOn: "",
                  workOrderStatus: "",
                  batchSize: "",
                  status: "",
                  effectiveDate: "",
                  material: "",
                  sfgCode: "",
                  description: "",
                  quantityIssued: "",
                  materialReturnsNoteId: "",
                } as IMaterialReturns
              }
              validate={(values: IMaterialReturns) => {
                let errors: any = {};
                if (!values.material) {
                  errors.materials = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const obj = { ...values };
                console.log(obj);
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
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={9} marginBottom="-2%">
                      <Grid item marginTop={1}>
                        <Typography fontSize={14}>Material Returns</Typography>
                      </Grid>
                      <Grid item>
                        <FormControl component="fieldset">
                          <RadioGroup name="order">
                            <Grid container spacing={1}>
                              <Grid item>
                                <FormControlLabel
                                  value="workOrderRadio"
                                  control={
                                    <Radio onClick={() => setOrder(true)} />
                                  }
                                  label="Work Order"
                                />
                              </Grid>

                              <Grid item>
                                <FormControlLabel
                                  value="other"
                                  control={
                                    <Radio onClick={() => setOrder(false)} />
                                  }
                                  label="Other"
                                />
                              </Grid>
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  {order ? (
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <FormControl margin="normal" required fullWidth>
                        <AppTextInput
                          name="workOrder"
                          label="Work Order"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.workOrder &&
                            (isSubmitted || touched.workOrder)
                              ? true
                              : false
                          }
                          helperText={
                            errors.workOrder &&
                            (isSubmitted || touched.workOrder) &&
                            errors.workOrder
                          }
                          value={values.workOrder}
                          fullWidth={false}
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <FormControl margin="normal" required fullWidth>
                        <AppTextInput
                          name="containerId"
                          label="Container ID"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.containerId &&
                            (isSubmitted || touched.containerId)
                              ? true
                              : false
                          }
                          helperText={
                            errors.containerId &&
                            (isSubmitted || touched.containerId) &&
                            errors.containerId
                          }
                          value={values.containerId}
                          fullWidth={false}
                        />
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="materialDispatchNoteId"
                        label="Material Dispatch Note ID"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.materialDispatchNoteId &&
                          (isSubmitted || touched.materialDispatchNoteId)
                            ? true
                            : false
                        }
                        helperText={
                          errors.materialDispatchNoteId &&
                          (isSubmitted || touched.materialDispatchNoteId) &&
                          errors.materialDispatchNoteId
                        }
                        value={values.materialDispatchNoteId}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={0.5} marginTop="3%" marginLeft='-1%'>
                    <IconButton
                      color="primary"
                      sx={{ backgroundColor: "lightgray" }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="line"
                        label="Line"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.line && (isSubmitted || touched.line)
                            ? true
                            : false
                        }
                        helperText={
                          errors.line &&
                          (isSubmitted || touched.line) &&
                          errors.line
                        }
                        value={values.line}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="createdOn"
                        label="Created On"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.createdOn && (isSubmitted || touched.createdOn)
                            ? true
                            : false
                        }
                        helperText={
                          errors.createdOn &&
                          (isSubmitted || touched.createdOn) &&
                          errors.createdOn
                        }
                        value={values.createdOn}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="workOrderStatus"
                        label="Work Order Status"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.workOrderStatus &&
                          (isSubmitted || touched.workOrderStatus)
                            ? true
                            : false
                        }
                        helperText={
                          errors.workOrderStatus &&
                          (isSubmitted || touched.workOrderStatus) &&
                          errors.workOrderStatus
                        }
                        value={values.workOrderStatus}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="batchSize"
                        label="Batch Size"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.batchSize && (isSubmitted || touched.batchSize)
                            ? true
                            : false
                        }
                        helperText={
                          errors.batchSize &&
                          (isSubmitted || touched.batchSize) &&
                          errors.batchSize
                        }
                        value={values.batchSize}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppSelectInput
                        name="status"
                        label="Status"
                        value={values.status}
                        menuItems={menuItems.map((x) => {
                          return {
                            label: x.value,
                            value: x.value,
                          };
                        })}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppSelectInput>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="effectiveDate"
                        label="Effective Date"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.effectiveDate &&
                          (isSubmitted || touched.effectiveDate)
                            ? true
                            : false
                        }
                        helperText={
                          errors.effectiveDate &&
                          (isSubmitted || touched.effectiveDate) &&
                          errors.effectiveDate
                        }
                        value={values.effectiveDate}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl
                      fullWidth
                      required
                      margin="normal"
                      disabled={order ? true : false}
                    >
                      <AppSelectInput
                        name="material"
                        label="Material"
                        value={values.material}
                        disabled={order ? false : true}
                        menuItems={menu.map((x) => {
                          return {
                            label: x.value,
                            value: x.value,
                          };
                        })}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppSelectInput>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="sfgCode"
                        label="FG/SFG Code"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.sfgCode && (isSubmitted || touched.sfgCode)
                            ? true
                            : false
                        }
                        helperText={
                          errors.sfgCode &&
                          (isSubmitted || touched.sfgCode) &&
                          errors.sfgCode
                        }
                        value={values.sfgCode}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="description"
                        label="Description"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.description &&
                          (isSubmitted || touched.description)
                            ? true
                            : false
                        }
                        helperText={
                          errors.description &&
                          (isSubmitted || touched.description) &&
                          errors.description
                        }
                        value={values.description}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="quantityIssued"
                        label="Quantity Issued"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.quantityIssued &&
                          (isSubmitted || touched.quantityIssued)
                            ? true
                            : false
                        }
                        helperText={
                          errors.quantityIssued &&
                          (isSubmitted || touched.quantityIssued) &&
                          errors.quantityIssued
                        }
                        value={values.quantityIssued}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FormControl margin="normal" required fullWidth>
                      <AppTextInput
                        name="materialReturnsNoteId"
                        label="Material Returns Note ID"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.materialReturnsNoteId &&
                          (isSubmitted || touched.materialReturnsNoteId)
                            ? true
                            : false
                        }
                        helperText={
                          errors.materialReturnsNoteId &&
                          (isSubmitted || touched.materialReturnsNoteId) &&
                          errors.materialReturnsNoteId
                        }
                        value={values.materialReturnsNoteId}
                        fullWidth={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={0.5} marginTop="3%" marginLeft='-1%'>
                    <IconButton
                      color="primary"
                      sx={{ backgroundColor: "lightgray" }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default MaterialReturnComponent;
