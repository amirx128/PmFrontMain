import { Paper } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Typography,
  Modal,
} from "@mui/material";
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
import { useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../../utils/functions.ts";
import { Link } from "react-router-dom";
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
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [requestId, setRequestId] = useState<number>(null);
  const { user } = useSelector((state: any) => state?.user);

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
      unitId: "",
      placeOfUseId: "",
    },
  });

  useEffect(() => {
    if (getValues("placeOfUseId") && getValues("unitId")) {
      getAllCommodities();
    }
  }, [watch("placeOfUseId"), watch("unitId")]);
  useEffect(() => {
    getAllUnits();
    getAllActivities();
    getPlacedOfUse();
    const storageData = localStorage.getItem("user");
    if (storageData) {
      const data = JSON.parse(storageData);
      setUserData(data);
      setbusinessRoleDetails(data?.businessRoles);
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    addNew(data);
  });
  const reset = () => {
    setValue("unitId", "");
    setValue("placeOfUseId", "");
    setComodoties([]);
  };
  const addNew = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/RequestCase/NewRequestCase", {
        userId: user?.id ?? getUserIdFromStorage(),
        unitId: data.unitId,
        placeOfUseId: data.placeOfUseId,
        commodites: [...comodities],
      });
      if (response.data.statusCode === 200 && response.data.model) {
        props.snackbarShowMessage("ثبت کالا با موفقیت انجام شد");
        setIsShowModal(true);
        setTrackingCode(response.data.model.trackingCode);
        setRequestId(response.data.model.requestId);
        reset();
      } else {
        props.snackbarShowMessage("ثبت کالا با خطا مواجه شد", "error");
      }
      setLoading(false);
    } catch (error) {
      props.snackbarShowMessage("ثبت کالا با خطا مواجه شد", "error");
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getAllUnits = async () => {
    try {
      const response = axios.post("/Definition/GetAllUnit", {
        userId: user?.id ?? getUserIdFromStorage(),
        name: "",
        projectId: 0,
        floorId: 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllCommodities = async () => {
    const placeOfUseId = getValues("placeOfUseId");
    const unitId = getValues("unitId");
    if (!placeOfUseId && !unitId) return;
    try {
      const response: any = await axios.post(
        "/RequestCase/GetAllCommoditiesForOnePlaceOfUse",
        {
          userId: user?.id ?? getUserIdFromStorage(),
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
          userId: user?.id ?? getUserIdFromStorage(),
        }
      );
      setActivities(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPlacedOfUse = async () => {
    try {
      const response = await axios.post("/RequestCase/GetAllPlaseOfUse", {
        userId: user?.id ?? getUserIdFromStorage(),
      });
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
  };
  const deleteComodityRow = (index: number) => {
    let comodityList = [...comodities];
    comodityList.splice(index, 1);
    setComodoties(comodityList);
  };
  return (
    <Card sx={{ padding: "20px" }}>
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
          <Divider sx={{ m: "40px 0" }} />
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
      <Modal open={isShowModal} onClose={() => setIsShowModal(false)}>
        <Box
          sx={{
            width: "40%",
            backgroundColor: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            padding: "1.6rem 3.2rem",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ثبت کالا با موفقیت انجام شد
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            کد رهگیری شما برابر :{" "}
            <Link to={`/product-details/${requestId}`}>{trackingCode}</Link>{" "}
            میباشد
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
};
export default withSnackbar(ProductRequest);
