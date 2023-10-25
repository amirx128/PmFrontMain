import { PageTileComponent } from "../style";

import {
  Box,
  Card,
  CardHeader,
  Grid as CardGrid,
  IconButton,
  Typography,
  Switch,
  CircularProgress,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { JalaliDatePickerNew } from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import { Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllCommodityTransactionsAction,
  GetOneCommodityTransactions,
} from "../../redux/features/supplierSlicer.ts";
import { GetCountCommodityInWarehouse } from "../../redux/features/supplierSlicer.ts";
import gridDict from "../../dictionary/gridDict.ts";
import { Link, useParams } from "react-router-dom";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

const CommodityTransactions = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const { transaction, Counter, allTransaction } = useSelector(
    (state: any) => state.supplier?.supplier
  );
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
  });

  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const [isShowAll, setIsShowAll] = useState(false);
  // const SelectedItemId:id = 18;
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "شناسه تراکنش",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "exitWarehouseOrderTrackingCode",
      headerName: "تراکنش خروج از انبار",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderTrackingCode",
      headerName: " تراکنش خرید ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "type",
      headerName: "نوع تراکنش",
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
      },
    },
    {
      field: "activityDate",
      headerName: "تاریخ",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => (
        <span>{new Date(value).toLocaleDateString("fa-IR").toString()}</span>
      ),
    },
    {
      field: "count",
      headerName: "تعداد",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "price",
      headerName: "قیمت",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
  ];
  useEffect(() => {
    getList();
    GetCount();
  }, []);
  useEffect(() => {
    if (isShowAll) {
      getAlltransactions();
    }
  }, [isShowAll]);

  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        GetOneCommodityTransactions({
          SelectedItemId: id,
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
        SelectedItemId: id,
      })
    );
  };
  const getAlltransactions = async () => {
    const body = {
      SelectedItemId: id,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
    };
    await dispatch(GetAllCommodityTransactionsAction(body));
  };
  const getList = async () => {
    const body = {
      SelectedItemId: id,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
    };
    await dispatch(GetOneCommodityTransactions(body));
  };
  const GetCount = async () => {
    const body = {
      commodityId: id,
    };
    await dispatch(GetCountCommodityInWarehouse(body));
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
        SelectedItemId: id,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      })
    );
  };

  const handleRmoveFilter = async () => {
    await dispatch(
      GetOneCommodityTransactions({
        SelectedItemId: id,
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
        <CardHeader />
        <PageTileComponent __text={document.title} />
        <div className="text-right mb-16 mr-6 text-xl flex gap-12  flex-col">
          <p>تعداد : {Counter.data && Counter.data}</p>
          {user.usersRoles?.some((role) => role.roleName === "Admin") && (
            <div>
              مشاهده همه
              <Switch
                checked={isShowAll}
                onChange={() => setIsShowAll((prev) => !prev)}
              />
            </div>
          )}
        </div>
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
                <IconButton color="success">
                  <SimCardDownloadIcon />
                </IconButton>
              </IconButton>
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>
        {isShowAll && allTransaction.pending && <CircularProgress />}
        {!isShowAll && transaction.pending && <CircularProgress />}
        {!isShowAll && transaction.data && (
          <Grid
            columns={columns}
            rows={
              transaction?.data.map((row, index) => ({
                id: index,
                ...row,
              })) ?? []
            }
            pagination={{}}
            onSortModelChange={handleSortModelChange}
          />
        )}
        {isShowAll && allTransaction.data && (
          <Grid
            columns={columns}
            rows={
              allTransaction?.data.map((row, index) => ({
                id: index,
                ...row,
              })) ?? []
            }
            pagination={{}}
            onSortModelChange={handleSortModelChange}
          />
        )}
      </Card>
    </CardGrid>
  );
};
export default CommodityTransactions;
