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
import JalaliDatePicker from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import SelectComponent from "../../components/select/selects.tsx";
import axios from "../../utils/axios.config.ts";
import { Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../utils/functions.ts";
import { Link } from "react-router-dom";

const requestUrl = "warehouse/RequesterUser.Q";
const RequesterUser = () => {
  const [data, setData] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [toDate, setToDate] = useState(new Date().toLocaleDateString("fa-IR"));
  const [approveStates, setApproveStates] = useState<any[]>([]);
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
      finalApproveStateId: "",
    },
  });
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "requesterUser",
      headerName: "درخواست دهنده",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "commodityName",
      headerName: "نام کالا",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requiredDate",
      headerName: "تاریخ نیاز",
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
      field: "purchaseOrderId",
      headerName: "شناسه خرید کالا",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderTrackingCode",
      headerName: "شماره تراکنش خرید کالا ",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseId",
      headerName: "شناسه درخواست",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseTrackingCode",
      headerName: " شماره تراکنش درخواست ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseCreateDate",
      headerName: "تاریخ ایجاد درخواست",
      minWidth: 150,
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <span>
          {new Date(params.row.createDate)
            .toLocaleDateString("fa-IR")
            .toString()}
        </span>
      ),
    },
    {
      field: "commodityId",
      headerName: "شناسه کالا",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "warehouseOrderCount",
      headerName: "تعداد سفارش از انبار",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseCommodityId",
      headerName: "شناسه کالای درخواستی",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },

    {
      field: "countOfDone",
      headerName: "تعداد مورد تایید",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "warehouseTrackingCode",
      headerName: "شماره تراکنش انبار",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "warehouseOrderId",
      headerName: "شناسه سفارش از انبار",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
  ];
  useEffect(() => {
    getList();
    getApproveStates();
  }, []);
  const { user } = useSelector((state: any) => state?.user);

  const getApproveStates = async () => {
    try {
      const response = await axios.post("/Support/GetApproveStates", {
        userId: user?.id ?? getUserIdFromStorage(),
      });

      setApproveStates(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleEditClick = (entity) => {
    navigate("/supportFinalApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = () => {};
  const getList = async () => {
    const filters = getValues();
    try {
      const response = await axios.post(requestUrl, {
        userId: user?.id ?? getUserIdFromStorage(),
        pageIndex: 1,
        pageCount: 200,
        orderType: "desc",
        orderBy: "requestCaseCreateDate",
        fromDate:
          filters && filters.fromDate != "" ? filters.fromDate : "2021-07-27",
        toDate: filters && filters.toDate != "" ? filters.toDate : "2024-07-27",
      });
      setData(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e).toISOString();
    setFromDate(date);
    setValue("fromDate", date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toISOString();
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
          title="لیست تحویل دریافت"
          titleTypographyProps={{ variant: "h6" }}
        />

        <Box>
          <form onSubmit={onSubmit}>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <Controller
                  control={control}
                  rules={{ required: " approve state is required" }}
                  name="approveStateId"
                  defaultValue={3}
                  render={({ field }) => (
                    <SelectComponent
                      label="وضعیت"
                      valuefieldName="id"
                      labelFieldName="state"
                      options={approveStates}
                      field={field}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePicker
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  register={register}
                ></JalaliDatePicker>
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePicker
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ "
                  register={register}
                ></JalaliDatePicker>
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
          rowIdFields={["approveStateId", "commodityName"]}
          columns={columns}
          rows={data.map((row, index) => ({ id: index, ...row }))}
          pagination={{}}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default RequesterUser;
