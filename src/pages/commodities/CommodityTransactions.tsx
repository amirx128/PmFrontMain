import {
  Box,
  Card,
  CardHeader,
  Grid as CardGrid,
  IconButton,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { JalaliDatePickerNew } from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import { Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useDispatch, useSelector } from "react-redux";
import { GetOneCommodityTransactions } from "../../redux/features/supplierSlicer.ts";
import gridDict from "../../dictionary/gridDict.ts";
import { Link } from "react-router-dom";

const CommodityTransactions = () => {
  const dispatch = useDispatch<any>();
  const { GetTransactions } = useSelector((state: any) => state.supplier?.supplier);
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
  });
  const   SelectedItemId = 18;
  const columns: GridColDef[] = [
    {
      field: "Id",
      headerName: gridDict.requesterUser,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "ExitWarehouseOrderId",
      headerName: gridDict.purchaseOrderId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "ExitWarehouseOrderTrackingCode",
      headerName: gridDict.purchaseOrderTrackingCode,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "PurchaseOrderId",
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
      field: "PurchaseOrderTrackingCode",
      headerName: gridDict.requestCaseId,
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
            <Link to={`/approve/details/${row.purchaseOrderId}`}>{value}</Link>
          </Typography>
        );
        }
    },
    {
      field: "type",
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
      field: "ActivityDate",
      headerName: gridDict.countOfDone,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "Count",
      headerName: gridDict.commodityName,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
  ];
  useEffect(() => {
    getList();
  }, []);

  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        GetOneCommodityTransactions({
          SelectedItemId,
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
        })
      );
      return;
    }
    const sortField = sortArr?.at(0).field;
    const sortType = sortArr?.at(0).sort;
    await dispatch(
      GetOneCommodityTransactions({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        orderBy: sortField,
        orderType: sortType,
        SelectedItemId,
      })
    );
  };
  const getList = async () => {
    const body = {
      SelectedItemId,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
    };
    dispatch(GetOneCommodityTransactions(body));
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
      GetOneCommodityTransactions({
      SelectedItemId,
      fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      })
    );
  };

  const handleRmoveFilter = async () => {
    await dispatch(
      GetOneCommodityTransactions({
        SelectedItemId,
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
      })
    );
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
          title="در صف بررسی"
          titleTypographyProps={{ variant: "h6" }}
        />

        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePickerNew
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  value={fromDate}
                ></JalaliDatePickerNew>
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePickerNew
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ "
                  value={toDate}
                ></JalaliDatePickerNew>
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
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>

        <Grid
          rowIdFields={[
            "Id",
            "ExitWarehouseOrderId",
            "ExitWarehouseOrderTrackingCode",
            "PurchaseOrderId",
            "PurchaseOrderTrackingCode",
            "type",
            "ActivityDate",
            "Count",
          ]}
          columns={columns}
          rows={
            GetTransactions?.data.map((row, index) => ({ id: index, ...row })) ?? []
          }
          pagination={{}}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default CommodityTransactions;
