import EditIcon from "@mui/icons-material/Edit";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import axios from "../../../utils/axios.config";
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
import { Link, useNavigate } from "react-router-dom";
import SelectComponent from "../../../components/select/selects";
import JalaliDatePicker from "../../../components/date-picker/date-picker";
import { Row } from "./style";
import Grid from "../../../components/grid/grid";
import { useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../../utils/functions.ts";
const SupportList: React.FC<any> = (props) => {
  const [data, setData] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<any>(new Date());
  const [toDate, setToDate] = useState<any>(new Date());
  const navigate = useNavigate();
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
    defaultValues: { approveStateId: 3, fromDate: "", toDate: "" },
  });
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
      field: "requestCaseId",
      headerName: "شناسه کالا",
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
      field: "requesterUserId",
      headerName: "شناسه درخواست دهنده",
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
      field: "count",
      headerName: "تعداد مورد نیاز",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "newcount",
      headerName: "تعداد تایید شده ",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "trackingCode",
      headerName: "شماره تراکنش ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      renderCell: ({ value, row }) => {
        return (
          <Typography
            variant="body1"
            color="secondary"
            sx={{ cursor: "pointer" }}
          >
            <Link to={`/product-details/${row.requestCaseId}`}>{value}</Link>
          </Typography>
        );
      },
    },
    {
      field: "isEditable",
      headerName: "قابل ویرایش",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: ({ value, row }) => {
        return (
          <Typography
            variant="body1"
            color="secondary"
            sx={{ cursor: "pointer" }}
          >
            {value ? "بله" : "خیر"}
          </Typography>
        );
      },
    },
    {
      field: "createDate",
      headerName: " تاریخ ایجاد",
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
      //   valueGetter: (params: GridValueGetterParams) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "placeOfUseName",
      headerName: "محل مصرف ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCommodityId",
      headerName: "شناسه درخواست کالا",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "approvestate",
      headerName: " وضعیت تایید ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "approverId",
      headerName: "شناسه تایید کننده",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "approverName",
      headerName: "نام تایید کننده ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "approveDate",
      headerName: "تاریخ تایید ",
      minWidth: 150,
      flex: 1,
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
      field: "finalApprovestate",
      headerName: "وضعیت نهایی ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "finalApproverId",
      headerName: "شناسه تایید کننده نهایی",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "finalApproverName",
      headerName: "نام تایید کننده نهایی",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "finalApproveDate",
      headerName: "تاریخ تایید نهایی ",
      minWidth: 150,
      flex: 1,
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
      field: "scheduleActivityId",
      headerName: "شناسه زمان بندی",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderId",
      headerName: "شناسه خرید کالا",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderTrackingCode",
      headerName: "شماره تراکنش خرید کالا",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "exitFromWarehouseId",
      headerName: "شناسه خروج از انبار",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "exitFromWarehouseTrackingCode",
      headerName: "شماره تراکنش خروج از انبار",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "exitFromWarehouseCount",
      headerName: "تعداد خروج از انبار",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseCount",
      headerName: "تعداد خرید",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "ActionColumn",
      sortable: false,
      minWidth: 150,
      flex: 1,
      filterable: false,
      hideSortIcons: true,
      type: "actions",
      cellClassName: "actions",
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(params.row)}
            color="inherit"
          />
        </>
      ),
    },
  ];
  useEffect(() => {
    getList();
    getApproveStates();
  }, []);
  useEffect(() => {
    getList();
  }, [watch]);
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
    navigate("/supportApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = () => {};
  const getList = async () => {
    const filters = getValues();
    try {
      const response = await axios.post("/Support/ApproveQ", {
        userId: user?.id ?? getUserIdFromStorage(),
        pageIndex: 1,
        pageCount: 200,
        orderType: "asc",
        orderBy: "CreateDate",

        fromDate:
          filters && filters.fromDate != "" ? filters.fromDate : "2021-07-27",
        toDate: filters && filters.toDate != "" ? filters.toDate : "2024-07-27",
        approveStateId:
          filters && filters.approveStateId != "" ? filters.approveStateId : 3,
      });
      setData(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e).toLocaleDateString("en-US");
    setFromDate(date);
    setValue("fromDate", date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toLocaleDateString("en-US");
    setToDate(date);
    setValue("toDate", date);
  };
  const onSubmit = (data) => {};
  console.log(data);
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
          title="لیست تایید پشتیبانی"
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
                  name="fromDate"
                  label="از تاریخ"
                  register={register}
                ></JalaliDatePicker>
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePicker
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="toDate"
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
          onDoubleClick={(e) => handleEditClick(e.row)}
          rowIdFields={["approveStateId", "commodityName", "approverId"]}
          columns={columns}
          rows={data.map((row, index) => ({ id: index, ...row }))}
          pagination={{}}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default SupportList;
