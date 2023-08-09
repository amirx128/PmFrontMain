import { Paper } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ComodityForm from "../../../components/comodity-form/comodity-form";
import Select from "../../../components/select/selects";
import { IComodityFields } from "../../../core/comodity/comodity.model";
import axios from "../../../utils/axios.config";
import { withSnackbar } from "../../../utils/snackbar-hook";
import theme from "../../../utils/theme";
import RequestDetail from "../request-detail/request-detail";
import { Row } from "./style";
type FormFields = {
  unitId: string;
  placeOfUseId: string;
};

const ProductRequest: React.FC<any> = (props: any) => {
  const [placeOfUsed, setPlacedOdUse] = useState([]);
  const [units, setUnits] = useState([]);
  const [comodities, setComodoties] = useState<IComodityFields[]>([]);
  const [activities, setActivities] = useState<IComodityFields[]>([]);
  const [commodityDescription, setCommodityDescription] = useState<any[]>([]);
  const [businessRoleDetails, setbusinessRoleDetails] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormFields>({
    defaultValues: {
      unitId: " ",
      placeOfUseId: " ",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("submitting...", data);
    console.log("errors...", errors);
    addNew(data);
  });
  const addNew = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/RequestCase/NewRequestCase", {
        userId: "1",
        unitId: data.unitId,

        placeOfUseId: data.placeOfUseId,
        commodites: [...comodities],
      });
      if (response.data.statusCode === 200) {
        props.snackbarShowMessage("ثبت کالا با موفقیت انجام شد");
      } else {
        props.snackbarShowMessage("ثبت کالا با خطا مواجه شد", "error");
      }
      setLoading(false);
      console.log(response);
    } catch (error) {
      props.snackbarShowMessage("ثبت کالا با خطا مواجه شد", "error");
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getAllCommodities();
  }, [watch("placeOfUseId"), watch("unitId")]);
  useEffect(() => {
    //
    getAllUnits();
    getAllActivities();
    localStorage.getItem("user");
    const storageData = localStorage.getItem("user");
    if (storageData) {
      const data = JSON.parse(storageData);
      setUserData(data);
      setbusinessRoleDetails(data.businessRoleDetailsModel);
      // setValue("departmentUnitName", data.departmentUnitName);
    }
    // console.log(makeTree([
    //   { "id" : "root"                     },
    //   { "id" : "a1",   "parentId" : "root", },
    //   { "id" : "a2",   "parentId" : "a1",   },
    //   { "id" : "a3",   "parentId" : "a2",   },
    //   { "id" : "b1",   "parentId" : "root", },
    //   { "id" : "b2",   "parentId" : "b1",   },
    //   { "id" : "b3",   "parentId" : "b1",   }
    // ]))
  }, []);

  const getAllUnits = async () => {
    try {
      const response = axios.post("/Definition/GetAllUnit", {
        userId: "1",
        name: "",
        projectId: 0,
        floorId: 0,
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const getAllCommodities = async () => {
  //   try {
  //     const response: any = await axios.all([
  //       axios.post(
  //         "http://46.225.237.138:33004/Definition/GetAllCommpdityOnTree",
  //         {
  //           userId: "1",
  //           projectId: 0,
  //           name: "",
  //           code: "",
  //         }
  //       ),
  //     ]);
  //     console.log(response.data.model);
  //     setCommodityDescription(makeTree(response.data.model).items);
  //     // console.log('im a tree', makeTree(response.data.model));
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const getAllCommodities = async () => {
    const placeOfUseId = getValues("placeOfUseId");
    const unitId = getValues("unitId");
    if (!placeOfUseId || placeOfUseId === "" || !unitId || unitId === "") {
      return;
    }
    try {
      const response: any = await axios.post(
        "/RequestCase/GetAllCommoditiesForOnePlaceOfUse",
        {
          userId: "1",
          placeId: getValues("placeOfUseId"),
          requesterBussinessRoleId: getValues("unitId"),
        }
      );
      setCommodityDescription(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllActivities = async () => {
    try {
      const response: any = await axios.post(
        "/Definition/GetScheduleActivities",
        {
          userId: "1",
        }
      );
      setActivities(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getPlacedOfUse();
  }, []);
  const getPlacedOfUse = async () => {
    try {
      const response = await axios.post("/RequestCase/GetAllPlaseOfUse", {
        userId: "1",
      });
      console.log(response.data.model);
      setPlacedOdUse(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addComodity = () => {
    setComodoties([
      ...comodities,
      { commodityId: null, activityId: null, count: null, requiredDate: null },
    ]);
  };
  const commodityChanged = (value, index) => {
    const newList = [...comodities];
    newList[index] = value;
    setComodoties(newList);
    console.log(comodities);
  };
  const deleteComodityRow = (index: number) => {
    let comodityList = [...comodities];
    comodityList.splice(index, 1);
    setComodoties(comodityList);
  };
  return (
    <Card sx={{padding:'20px'}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          placeContent: "space-between",
        }}
      >
        <Typography
          style={{
            fontFamily: "IRANSans",
            textAlign: "right",
            color: theme.palette.text.primary,
            fontWeight: "bold",
          }}
          variant="h5"
          component="h4"
        >
          درخواست کالا
        </Typography>
        <RequestDetail />
      </Box>

      <div className="mx-auto">
        <form onSubmit={onSubmit}>
          <Row>
            <Controller
              control={control}
              name="unitId"
              render={({ field }) => (
                // <TextField
                //   {...field}
                //   fullWidth
                //   sx={{ maxWidth: 600 }}
                //   label=" تاریخ تکمیل فرم"
                //   margin="dense"
                //   required
                //   error={!!errors.registerDate}
                //   helperText={
                //     errors.registerDate && `${errors.registerDate.message}`
                //   }
                // />
                <Select
                  field={field}
                  valuefieldName="id"
                  labelFieldName="name"
                  options={businessRoleDetails}
                  label="بخش درخواست کننده"
                />
              )}
            />

            <Controller
              control={control}
              defaultValue={""}
              name="placeOfUseId"
              render={({ field }) => (
                <Select
                  field={field}
                  options={placeOfUsed}
                  valuefieldName="id"
                  labelFieldName="name"
                  label="محل مصرف"
                />
              )}
            />
            <Box></Box>
          </Row>
          <Divider sx={{m:'40px 0'}} />
          <Typography
            component="h6"
            sx={{
              fontFamily: "IRANSans",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            کالاها
            <IconButton
              color="info"
              style={{ outline: "none" }}
              onClick={addComodity}
            >
              <AddIcon />
            </IconButton>
          </Typography>
          <Box>
            {comodities.map((item, index) => (
              <ComodityForm
                key={index + "a"}
                activities={activities}
                commodityDescription={commodityDescription}
                comodity={item}
                onCommodityChange={(e) => commodityChanged(e, index)}
                deleteComodity={() => deleteComodityRow(index)}
              ></ComodityForm>
            ))}
          </Box>
          <Row justifycontent="flex-end">
            <LoadingButton
              disabled={!isDirty && !isValid}
              loading={loading}
              type="submit"
              variant="contained"
              sx={{
                marginRight: "20px",
                color: theme.palette.common.white,
                backgroundColor: theme.palette.secondary.light,
                fontFamily: "IRANSans",
                ":hover": { backgroundColor: theme.palette.secondary.dark },
              }}
            >
              ثبت درخواست
            </LoadingButton>
          </Row>
        </form>
      </div>
    </Card>
  );
};
export default withSnackbar(ProductRequest);
