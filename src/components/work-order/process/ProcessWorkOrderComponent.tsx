import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Typography,
  FormControl,
  FormLabel,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import QueueIcon from "@mui/icons-material/Queue";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "index/shared/inputs/AppButton";
import { useState } from "react";
import moment from "moment";
import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import AppRadioGroupInput from "index/shared/inputs/AppRadioGroupInput";
import { COLOR_WHITE, PRIMARY_COLOR } from "index/Constant";
import WorkOrderStatusDialog from "index/components/work-order-status/WorkOrderStatusDialog";
import WorkOrderProcessInstructionDialog from "index/components/work-order-process-instructions/WorkOrderProcessInstructionDialog";
import ObjectSearchComponent from "index/shared/ObjectSearch";
interface WorkOrderProcessComponentProps {}

const WorkOrderProcessComponent: React.FC<
  WorkOrderProcessComponentProps
> = () => {
  const [workOrderDialog, setworkOrderDialog] = useState({
    isOpen: false,
    type: "",
  } as { isOpen: boolean; type: string });

  const [workOrderStatusDialog, setworkOrderStatusDialog] = useState({
    isOpen: false,
  } as { isOpen: boolean });

  const [
    workOrderProcessInstructionsDialog,
    setWorkOrderProcessInstructionsDialog,
  ] = useState({
    isOpen: false,
  } as { isOpen: boolean });

  const [woObj, setWOObj] = useState({
    ORDER_HEADERID: "",
    DESCRIPTION: "",
    CREATED_BY: "",
    CREATED_DATE: "",
    STARTED_ON: "",
    RECIPE_NAME: "",
    RECIPEPROCESSINSTRUCTIONSNAME: "",
    STAGE_ID: "",
    LINE_NAME: "",
    STAGEPROCESSINSTRUCTIONSNAME: "",
  });

  const list = [
    { name: "#" },
    { name: "TYPE" },
    { name: "TASK" },
    { name: "STATUS" },
    { name: "USER_ESIG" },
    { name: "QA_ESIG" },
    { name: "SUPERVISOR_ESIG" },
  ];
  const subTableList = [
    { name: "TASK" },
    { name: "STATUS" },
    { name: "USER_ESIG" },
    { name: "QA_ESIG" },
    { name: "SUPERVISOR_ESIG" },
  ];

  const taskStatusSearchArray = [
    {
      TYPE: "",
      "#": 1,
      TASK: "Material TaskType",
      STATUS: "",
      USER_ESIG: "",
      QA_ESIG: "",
      SUPERVISOR_ESIG: "",
      actions: [],
    },
  ];

  const handleDialogClose = (data: any) => {
    setworkOrderDialog({
      isOpen: false,
      type: "",
    });
  };
  const WorkOrderStatushandleDialogClose = (data: any) => {
    setworkOrderStatusDialog({
      isOpen: false,
    });
  };
  const WorkOrderProcessInstructionshandleDialogClose = (data: any) => {
    setWorkOrderProcessInstructionsDialog({
      isOpen: false,
    });
  };

  const stageList = [
    {
      value: "sorting",
    },
  ];

  const [radioValue, setValues] = React.useState("workOrder");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((event.target as HTMLInputElement).value);
  };
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">Process Workorder</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <div style={{ padding: "16px" }}>
                <Grid container spacing={2}>
                  <Grid container style={{ padding: "16px" }}>
                    <Grid item md={6} className="flex-1">
                      <AppTextInput
                        disabled
                        name="ORDER_HEADERID"
                        label="Order#"
                        type="text"
                        value={woObj.ORDER_HEADERID}
                      ></AppTextInput>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        sx={{
                          backgroundColor: "#efefef",
                          marginTop: 1.5,
                          padding: 1.5,
                          "&.MuiIconButton-root:hover": {
                            backgroundColor: "#efefef",
                          },
                        }}
                        onClick={() => {
                          setworkOrderDialog({
                            isOpen: true,
                            type: "Work Order",
                          });
                        }}
                      >
                        <QueueIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} lg={6}>
                      <Grid
                        container
                        flexDirection="row"
                        justifyContent="start"
                        alignItems="center"
                        spacing={{ xs: 1, sm: 2, md: 2 }}
                      >
                        <Grid item>
                          <Typography style={{ paddingTop: "30px" }}>
                            Order Status
                          </Typography>
                        </Grid>

                        <Grid item display="flex">
                          <span
                            style={{
                              height: 20,
                              width: 20,
                              borderRadius: 20,
                              marginTop: "30px",
                              background: "#f44336",
                            }}
                            onClick={() => {
                              setworkOrderStatusDialog({
                                isOpen: true,
                              });
                            }}
                          ></span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12}>
                    <Grid container spacing={2} direction="row">
                      <Grid item xs={12} sm={3} md={3} lg={12}>
                        <AppTextInput
                          disabled
                          name="DESCRIPTION"
                          label="Description"
                          type="text"
                          value={woObj.DESCRIPTION}
                        ></AppTextInput>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12}>
                    <Grid container spacing={2} direction="row">
                      <Grid item xs={12} sm={5} md={3} lg={4}>
                        <AppTextInput
                          disabled
                          name="CREATED_BY"
                          label="Created by"
                          type="text"
                          value={woObj.CREATED_BY}
                        ></AppTextInput>
                      </Grid>
                      <Grid item xs={12} sm={5} md={3} lg={4}>
                        <AppDatePicker
                          disabled
                          name="CREATED_DATE"
                          label="Created On"
                          value={woObj.CREATED_DATE}
                        ></AppDatePicker>
                      </Grid>

                      <Grid item xs={12} sm={5} md={3} lg={4}>
                        <AppDatePicker
                          disabled
                          name="STARTED_ON"
                          label="Started On"
                          value={woObj.STARTED_ON}
                        ></AppDatePicker>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <Grid container spacing={2} direction="row">
                      <Grid item xs={12} sm={5} md={3} lg={6}>
                        <AppTextInput
                          disabled
                          name="RECIPE_NAME"
                          label="Recipe"
                          type="text"
                          value={woObj.RECIPE_NAME}
                        ></AppTextInput>
                      </Grid>
                      <Grid item xs={12} sm={5} md={3} lg={6}>
                        <Grid container>
                          <Grid item className="flex-1">
                            <AppTextInput
                              disabled
                              name="RECIPEPROCESSINSTRUCTIONSNAME"
                              label="Recipe Process Instruction"
                              type="text"
                              value={woObj.RECIPEPROCESSINSTRUCTIONSNAME}
                            ></AppTextInput>
                          </Grid>
                          <Grid item>
                            <IconButton
                              color="primary"
                              sx={{
                                backgroundColor: "#ddd",
                                marginTop: "10%",
                              }}
                              onClick={() => {
                                setWorkOrderProcessInstructionsDialog({
                                  isOpen: true,
                                });
                              }}
                            >
                              <QueueIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <Card variant="outlined">
                      <CardHeader
                        title="Manufacturing Details"
                        sx={{
                          backgroundColor: PRIMARY_COLOR,
                          color: COLOR_WHITE,
                        }}
                      ></CardHeader>
                      <CardContent>
                        <div style={{ padding: "3px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={5} md={3} lg={3}>
                              <AppTextInput
                                disabled
                                name="LINE_NAME"
                                label="Line"
                                type="text"
                                value={woObj.LINE_NAME}
                              ></AppTextInput>
                            </Grid>
                          </Grid>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={12}>
                    <Grid container spacing={2} direction="row">
                      <Grid
                        item
                        xs={12}
                        sm={5}
                        md={3}
                        lg={3}
                        container
                        flexDirection="row"
                        justifyContent="start"
                        alignItems="center"
                      >
                        <AppSelectInput
                          name="Stage"
                          label="Stage"
                          value={woObj.STAGE_ID}
                          // value={BOMvalue}
                          menuItems={stageList.map((x) => {
                            return {
                              label: x.value,
                              value: x.value,
                            };
                          })}
                          onChange={(data: any) => {
                            setWOObj({
                              ...woObj,
                              STAGE_ID: data,
                            });
                          }}
                        ></AppSelectInput>
                      </Grid>
                      <Grid item display="flex">
                        <span
                          style={{
                            height: 20,
                            width: 20,
                            borderRadius: 20,
                            marginTop: "30px",
                            background: "#f44336",
                          }}
                          onClick={() => {
                            console.log("open");
                            setworkOrderStatusDialog({
                              isOpen: true,
                            });
                          }}
                        ></span>
                      </Grid>
                      <Grid item xs={12} sm={5} md={3} lg={3}>
                        <Grid container>
                          <Grid item className="flex-1">
                            <AppTextInput
                              disabled
                              name="STAGEPROCESSINSTRUCTIONSNAME"
                              label="Stage Process Instruction"
                              type="text"
                              value={woObj.STAGEPROCESSINSTRUCTIONSNAME}
                            ></AppTextInput>
                          </Grid>
                          <Grid item>
                            <IconButton
                              color="primary"
                              sx={{
                                backgroundColor: "#ddd",
                                marginTop: "10%",
                              }}
                              onClick={() => {
                                setWorkOrderProcessInstructionsDialog({
                                  isOpen: true,
                                });
                              }}
                            >
                              <QueueIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    style={{ paddingLeft: "30px", paddingTop: "40px" }}
                  >
                    <Grid container spacing={2} direction="row">
                      <FormControl>
                        <Grid
                          container
                          direction="row"
                          justifyContent={{
                            xs: "start",
                            sm: "start",
                            md: "center",
                          }}
                          alignItems="center"
                          spacing={{ xs: 0, sm: 2, md: 8, lg: 10, xl: 10 }}
                        >
                          <Grid item>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              <Typography fontWeight="bold">
                                {" "}
                                Task Status
                              </Typography>
                            </FormLabel>
                          </Grid>
                          <Grid item>
                            <AppRadioGroupInput
                              row={true}
                              value={radioValue}
                              onChange={handleRadioChange}
                              menuItems={[
                                { label: "All", value: "all" },
                                { label: "Not Started", value: "notStarted" },
                                {
                                  label: "Started / Re-Open",
                                  value: "started/re-open",
                                },
                                {
                                  label: "Completed",
                                  value: "completed",
                                },
                              ]}
                            />
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <TableContainer
                      className="bordered-table"
                      sx={{
                        "&::-webkit-scrollbar": { width: "8px" },
                        "&::-webkit-scrollbar-thumb": { bgcolor: "#002699" },
                        "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" },
                      }}
                    >
                      <Table style={{ border: "1px solid black" }}>
                        <TableHead style={{ backgroundColor: "#248f8f" }}>
                          <TableRow>
                            {list.map((plans, index) => (
                              <TableCell key={index}>
                                <Typography
                                  fontWeight="bold"
                                  color="white"
                                  fontSize={15}
                                  maxWidth="100%"
                                  lineHeight={1}
                                >
                                  {plans.name}
                                </Typography>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {taskStatusSearchArray.map((ele, index: any) => (
                            <TableRow key={index}>
                              <TableCell>{ele["#"]}</TableCell>
                              <TableCell>{ele.TYPE}</TableCell>
                              <TableCell>{ele.TASK}</TableCell>
                              <TableCell>
                                <Grid display="flex">
                                  <span
                                    style={{
                                      height: 20,
                                      width: 20,
                                      borderRadius: 20,

                                      background: "#f44336",
                                    }}
                                    onClick={() => {
                                      setworkOrderStatusDialog({
                                        isOpen: true,
                                      });
                                    }}
                                  ></span>
                                </Grid>
                              </TableCell>

                              <TableCell>
                                <Grid display="flex">
                                  <span
                                    style={{
                                      height: 20,
                                      width: 20,
                                      borderRadius: 20,

                                      background: "#f44336",
                                    }}
                                    onClick={() => {
                                      setworkOrderStatusDialog({
                                        isOpen: true,
                                      });
                                    }}
                                  ></span>
                                </Grid>
                              </TableCell>
                              <TableCell>{ele.QA_ESIG}</TableCell>
                              <TableCell>{ele.SUPERVISOR_ESIG}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableHead style={{ backgroundColor: "#248f8f" }}>
                          <TableRow>
                            {subTableList.map((plans, index) => (
                              <TableCell key={index}>
                                <Typography
                                  fontWeight="bold"
                                  color="white"
                                  fontSize={15}
                                  maxWidth="100%"
                                  lineHeight={1}
                                >
                                  {plans.name}
                                </Typography>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {workOrderDialog.isOpen && (
        <CustomDialogComponent
          title={`${workOrderDialog.type} Search`}
          onClose={(data: any) => handleDialogClose(data)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleDialogClose(data)}
            tableName=""
          />
        </CustomDialogComponent>
      )}
      {workOrderStatusDialog.isOpen && (
        <CustomDialogComponent
          title="Status"
          onClose={(data: any) => WorkOrderStatushandleDialogClose(data)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <WorkOrderStatusDialog
            onClose={(data: any) => WorkOrderStatushandleDialogClose(data)}
          />
        </CustomDialogComponent>
      )}
      {workOrderProcessInstructionsDialog.isOpen && (
        <CustomDialogComponent
          title="Process Instructions"
          onClose={(data: any) =>
            WorkOrderProcessInstructionshandleDialogClose(data)
          }
          isOpen={true}
          fullWidth
          variant="md"
          hideCloseButton
        >
          <WorkOrderProcessInstructionDialog
            onClose={(data: any) =>
              WorkOrderProcessInstructionshandleDialogClose(data)
            }
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default WorkOrderProcessComponent;
