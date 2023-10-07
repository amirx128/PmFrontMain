import {
  Box,
  Card,
  Grid as CardGrid,
  CardHeader,
  Dialog,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import JalaliDatePicker from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import { ColumnGrid, Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import gridDict from "../../dictionary/gridDict.ts";
import {
  DownloadRequesterUserQAction,
  GetRequesterUserQAction,
} from "../../redux/features/productSlicer.ts";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { DialogContent } from "@material-ui/core";

const RequesterUser = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
  });

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
      field: "commodityName",
      headerName: gridDict.commodityName,
      flex: 1,
      minWidth: 150,
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
      renderCell: ({ value }) => (
        <span>{new Date(value).toLocaleDateString("fa-IR").toString()}</span>
      ),
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
      field: "requestCaseId",
      headerName: gridDict.requestCaseId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseTrackingCode",
      headerName: gridDict.requestCaseTrackingCode,
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
      field: "requestCaseCreateDate",
      headerName: gridDict.requestCaseCreateDate,
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
      headerName: gridDict.commodityId,
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
      headerName: gridDict.requestCaseCommodityId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "countOfDone",
      headerName: gridDict.countOfDone,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "warehouseTrackingCode",
      headerName: gridDict.warehouseTrackingCode,
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
            <Link to={`/requesterUser/details/${row.exitWarehouseOrderId}`}>
              {value}
            </Link>
          </Typography>
        );
      },
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
    getList();
  }, []);

  const { requesterUserQ } = useSelector(
    (state: any) => state?.product?.requesterUser
  );
  const dispatch = useDispatch<any>();

  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        GetRequesterUserQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
        })
      );
      return;
    }
    const sortField = sortArr?.at(0).field;
    const sortType = sortArr?.at(0).sort;
    await dispatch(
      GetRequesterUserQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        orderBy: sortField,
        orderType: sortType,
      })
    );
  };
  const getList = async () => {
    try {
      await dispatch(
        GetRequesterUserQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e);
    setFromDate(+date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e);
    setToDate(date);
  };
  const handleAddFilter = async () => {
    await dispatch(
      GetRequesterUserQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      })
    );
  };
  const handleRmoveFilter = async () => {
    await dispatch(
      GetRequesterUserQAction({
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
      })
    );
  };
  const handleDoubleClick = (e) => {
    navigate(`/requesterUser/details/${e.row.exitWarehouseOrderId}`);
  };
  const handleDownloadExcel = async () => {
    dispatch(
      DownloadRequesterUserQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      })
    );
  };
  const handleOpenCustomizeColumns = () => {};
  const allColumns = [
    { id: 0, title: "تست", value: "test" },
    { id: 1, title: "تست", value: "test" },
    { id: 2, title: "تست", value: "test" },
    { id: 3, title: "تست", value: "test" },
    { id: 4, title: "تست", value: "test" },
    { id: 5, title: "تست", value: "test" },
    { id: 6, title: "تست", value: "test" },
    { id: 7, title: "تست", value: "test" },
    { id: 8, title: "تست", value: "test" },
    { id: 9, title: "تست", value: "test" },
    { id: 10, title: "تست", value: "test" },
  ];
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
          title="لیست حواله های دریافتی"
          titleTypographyProps={{ variant: "h6" }}
        />
        <Dialog open={false}>
          <DialogTitle>شخصی سازی ستون ها</DialogTitle>
          <DialogContent>
            <ColumnGrid>
              {allColumns.map((column) => (
                <FormControlLabel
                  dir="ltr"
                  control={<Switch color="success" />}
                  label={column.title}
                />
              ))}
            </ColumnGrid>
          </DialogContent>
        </Dialog>

        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePicker
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  value={fromDate}
                ></JalaliDatePicker>
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePicker
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ "
                  value={toDate}
                ></JalaliDatePicker>
              </Box>
              <IconButton
                aria-label="اعمال فیلتر"
                onClick={handleAddFilter}
                color="info"
              >
                <Filter />
              </IconButton>
              <IconButton onClick={handleRmoveFilter} color="info">
                <FilterOff />
              </IconButton>
              <IconButton onClick={handleDownloadExcel} color="success">
                <SimCardDownloadIcon />
              </IconButton>
              <IconButton onClick={handleOpenCustomizeColumns} color="success">
                <DashboardCustomizeIcon />
              </IconButton>

              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>

        <Grid
          rowIdFields={["approveStateId", "commodityName"]}
          columns={columns}
          rows={requesterUserQ?.data?.map((row, index) => ({
            id: index,
            ...row,
          }))}
          pagination={{}}
          onSortModelChange={handleSortModelChange}
          onDoubleClick={handleDoubleClick}
        />
      </Card>
    </CardGrid>
  );
};
export default RequesterUser;
