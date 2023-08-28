import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  Grid as CardGrid,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import JalaliDatePicker, {
  JalaliDatePickerNew,
} from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import SelectComponent from "../../components/select/selects.tsx";
import axios from "../../utils/axios.config.ts";
import { Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useDispatch, useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../utils/functions.ts";
import { Link } from "react-router-dom";
import { LogisticsSendItemsAction } from "../../redux/features/purchaseSlicer.ts";
import gridDict from "../../dictionary/gridDict.ts";
const requestUrl = "requestCase/SentItem";
const LogisticsSendItems = () => {
  const dispatch = useDispatch();
  const sendItems = useSelector(
    (state: any) => state.purchase?.logistics?.sendItems
  );

  const [fromDate, setFromDate] = useState(new Date().toLocaleDateString());
  const [toDate, setToDate] = useState(new Date().toLocaleDateString());
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<any>({
    defaultValues: {
      fromDate: "",
      toDate: "",
    },
  });
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "requesterUser",
      headerName: gridDict.requesterUser,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderCount",
      headerName: gridDict.purchaseOrderCount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderId",
      headerName: gridDict.purchaseOrderId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderTrackingCode",
      headerName: gridDict.purchaseOrderTrackingCode,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseTrackingCode",
      headerName: gridDict.requestCaseTrackingCode,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseId",
      headerName: gridDict.requestCaseId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseCreateDate",
      headerName: gridDict.requestCaseCreateDate,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: (params) => (
        <span>
          {new Date(params.row.requestCaseCreateDate)
            .toLocaleDateString("fa-IR")
            .toString()}
        </span>
      ),
    },
    {
      field: "countOfDone",
      headerName: gridDict.countOfDone,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "commodityName",
      headerName: gridDict.commodityName,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "commodityId",
      headerName: gridDict.commodityId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },

    {
      field: "purchaseTrackingCode",
      headerName: gridDict.purchaseTrackingCode,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseCommodityId",
      headerName: gridDict.requestCaseCommodityId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderDetailsId",
      headerName: gridDict.purchaseOrderDetailsId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requiredDate",
      headerName: gridDict.requiredDate,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: (params) => (
        <span>
          {new Date(params.row.approveDate)
            .toLocaleDateString("fa-IR")
            .toString()}
        </span>
      ),
    },
    {
      field: "warehouseTrackingCode",
      headerName: gridDict.warehouseTrackingCode,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "warehouseOrderId",
      headerName: gridDict.warehouseOrderId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
  ];
  useEffect(() => {
    //@ts-ignore
    dispatch(
      LogisticsSendItemsAction({
        fromDate: "2021-07-27",
        toDate: "2024-07-27",
      })
    );
  }, [dispatch]);
  const { user } = useSelector((state: any) => state?.user);

  const handleEditClick = (entity) => {
    navigate("/supportFinalApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = () => {};
  const getList = async () => {
    const filters = getValues();
    const body = {
      fromDate:
        filters && filters.fromDate != "" ? filters.fromDate : "2021-07-27",
      toDate: filters && filters.toDate != "" ? filters.toDate : "2024-07-27",
    };
    dispatch(LogisticsSendItemsAction(body));
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e).toJSON().split("T")[0];
    setFromDate(date);
    setValue("fromDate", date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toJSON().split("T")[0];
    setToDate(date);
    setValue("toDate", date);
  };
  const onSubmit = (data) => {};
  return (
    <CardGrid
      item
      xs={12}
      sx={{
        borderRadius: 2,
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
        marginBottom: "10px",
      }}
    >
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          style={{ textAlign: "right" }}
          title="تدارکات -بررسی شده"
          titleTypographyProps={{ variant: "h6" }}
        />

        <Box>
          <form onSubmit={onSubmit}>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePickerNew
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  register={register}
                ></JalaliDatePickerNew>
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePickerNew
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ "
                  register={register}
                ></JalaliDatePickerNew>
              </Box>
              <IconButton
                aria-label="اعمال فیلتر"
                onClick={getList}
                color="info"
              >
                <Filter />
              </IconButton>
              <IconButton onClick={getList} color="info">
                <FilterOff />
              </IconButton>
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>

        <Grid
          onDoubleClick={(e) => handleEditClick(e.row)}
          rowIdFields={[
            "purchaseOrderId",
            "requesterUser",
            "requestCaseId",
            "commodityId",
            "requestCaseCommodityId",
            "purchaseOrderDetailsId",
            "warehouseOrderId",
          ]}
          columns={columns}
          rows={
            sendItems?.data?.map((row, index) => ({ id: index, ...row })) ?? []
          }
          pagination={{}}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default LogisticsSendItems;
