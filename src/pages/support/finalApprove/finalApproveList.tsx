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
import JalaliDatePicker from "../../../components/date-picker/date-picker";
import Grid from "../../../components/grid/grid";
import SelectComponent from "../../../components/select/selects";
import axios from "../../../utils/axios.config";
import { Row } from "../style";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../../utils/functions.ts";
import { Link } from "react-router-dom";
const FinalApproveRequestList = () => {
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
      field: "purchaseCount",
      headerName: "تعداد خریداری شده ",
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
      renderCell: ({ value, row }) => (
        <Typography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer" }}
        >
          <Link to={`/product-details/${row.requestCaseId}`}>{value}</Link>
        </Typography>
      ),
    },
    // when type of column is number align should be left, because of rtl direction

    {
      field: "createDate",
      headerName: " تاریخ ایجاد",
      //   description: "This column has a value getter and is not sortable.",
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
      field: "approvestate",
      headerName: " وضعیت تایید ",
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
    console.log(entity);
    navigate("/supportFinalApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = () => {};
  const getList = async () => {
    const filters = getValues();
    try {
      const response = await axios.post("/Support/FinalApproveQ", {
        approveStateId: 3,
        fromDate:
          filters && filters.fromDate != "" ? filters.fromDate : "2021-07-27",
        orderType: "asc",
        userId: user?.id ?? getUserIdFromStorage(),
        pageIndex: 1,
        pageCount: 200,
        orderBy: "CreateDate",

        toDate: filters && filters.toDate != "" ? filters.toDate : "2024-07-27",
        finalApproveStateId:
          filters && filters.finalApproveStateId != ""
            ? filters.finalApproveStateId
            : 3,

        //         approveStateId: 3,fromDate: "2021-07-27",orderBy: "CreateDate",
        // orderType: "asc",
        // pageCount: 10,pageIndex: 1,
        // toDate: "2024-07-27",
        // userId: "1",finalApproveStateId:2
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
          onDoubleClick={(e) => handleEditClick(e.row)}
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
export default FinalApproveRequestList;
