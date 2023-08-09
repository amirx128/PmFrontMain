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
import { useNavigate } from "react-router-dom";
import SelectComponent from "../../../components/select/selects";
import JalaliDatePicker from "../../../components/date-picker/date-picker";
import { Row } from "./style";
import Grid from "../../../components/grid/grid";
import {useSelector} from "react-redux";
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
      field: "trackingCode",
      headerName: "شماره تراکنش ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      renderCell: (params) => (
        <Typography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer" }}
        >
          {params.row.trackingCode}
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
    // setValue("approveStateId",3)
    getList();
    getApproveStates();
  }, []);
  useEffect(() => {
    console.log(watch);
    getList();
  }, [watch]);
  const {user} = useSelector((state) => state.user)
  const getApproveStates = async () => {
    try {
      const response = await axios.post("/Support/GetApproveStates", {
        userId: user?.id,
      });
      setApproveStates(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleEditClick = (entity) => {
    console.log(entity);
    navigate("/supportApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = () => {};
  const getList = async () => {
    const filters = getValues();
    console.log(filters);
    try {
      const response = await axios.post("/Support/ApproveQ", {
        userId: user?.id,
        pageIndex: 1,
        pageCount: 10,
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
    console.log(date);
    setFromDate(date);
    setValue("fromDate", date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toLocaleDateString("en-US");
    setToDate(date);
    setValue("toDate", date);
  };
  const onSubmit = (data) => {};
  const stateChanged = (e) => {
    console.log("aaa", e);
    // getList();
  };
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
                {/* <Controller
                  control={control}
                  name="approveStateId"
                  render={({ field }) => (
                    <Select
                      idFieldName="id"
                      labelFieldName="state"
                      data={approveStates}
                      name="approveStateId"
                      label="وضعیت تایید"
                      register={register}
                      errors={errors}
                    />
                  )}
                /> */}
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
        {/* <ActionRow>
          <Button
            sx={{ justifySelf: "flex-start", marginRight: "20px" }}
            color="info"
            variant="outlined"
          >
            <AddIcon />
            افزودن
          </Button>
        </ActionRow> */}
        <Grid
          onDoubleClick={(e) => handleEditClick(e.row)}
          rowIdFields={["approveStateId", "commodityName"]}
          columns={columns}
          rows={data}
          pagination={{}}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default SupportList;
