import {
  Box,
  Card,
  Grid as CardGrid,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import JalaliDatePicker from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import { Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import gridDict from "../../dictionary/gridDict.ts";
import {
  DownloadRequesterUserSentItemAction,
  RequesterUserSentItemAction,
} from "../../redux/features/productSlicer.ts";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

const RequestCase = () => {
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
      field: "count",
      headerName: gridDict.count,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "newcount",
      headerName: gridDict.newcount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseCount",
      headerName: gridDict.purchaseCount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "trackingCode",
      headerName: gridDict.trackingCode,
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
    {
      field: "createDate",
      headerName: gridDict.createDate,
      minWidth: 150,
      sortable: true,
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
      field: "requestCaseId",
      headerName: gridDict.requestCaseId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "approvestate",
      headerName: gridDict.approvestate,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "approverName",
      headerName: gridDict.approverName,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "approveDate",
      headerName: gridDict.approveDate,
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
      field: "requesterUserId",
      headerName: gridDict.requesterUserId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "isEditable",
      headerName: gridDict.isEditable,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCommodityId",
      headerName: gridDict.requestCommodityId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "approverId",
      headerName: gridDict.approverId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "finalApprovestate",
      headerName: gridDict.finalApprovestate,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "finalApproverId",
      headerName: gridDict.finalApproverId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "finalApproverName",
      headerName: gridDict.finalApproverName,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "finalApproveDate",
      headerName: gridDict.finalApproveDate,
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
      headerName: gridDict.scheduleActivityId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
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
      field: "purchaseOrderId",
      headerName: gridDict.purchaseOrderId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderTrackingCode",
      headerName: gridDict.purchaseOrderTrackingCode,
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
            <Link to={`/approve/details/${row.purchaseOrderId}`}>{value}</Link>
          </Typography>
        );
      },
    },
    {
      field: "exitFromWarehouseId",
      headerName: gridDict.exitFromWarehouseId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "exitFromWarehouseTrackingCode",
      headerName: gridDict.exitFromWarehouseTrackingCode,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "exitFromWarehouseCount",
      headerName: gridDict.exitFromWarehouseCount,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseCount",
      headerName: gridDict.purchaseCount,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
  ];
  useEffect(() => {
    getList();
  }, []);

  const { requestUserSentItem } = useSelector(
    (state: any) => state?.product?.requesterUser
  );
  const dispatch = useDispatch<any>();

  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        RequesterUserSentItemAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
        })
      );
      return;
    }
    const sortField = sortArr?.at(0).field;
    const sortType = sortArr?.at(0).sort;
    await dispatch(
      RequesterUserSentItemAction({
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
        RequesterUserSentItemAction({
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
      RequesterUserSentItemAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      })
    );
  };
  const handleRmoveFilter = async () => {
    await dispatch(
      RequesterUserSentItemAction({
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
      })
    );
  };
  const handleDownloadExcel = async () => {
    dispatch(
      DownloadRequesterUserSentItemAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
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
          title="لیست درخواست های ارسال شده"
          titleTypographyProps={{ variant: "h6" }}
        />

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
              <IconButton color="success" onClick={handleDownloadExcel}>
                <SimCardDownloadIcon />
              </IconButton>
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>

        <Grid
          rowIdFields={["approveStateId", "commodityName"]}
          columns={columns}
          rows={requestUserSentItem?.data?.map((row, index) => ({
            id: index,
            ...row,
          }))}
          pagination={{}}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default RequestCase;
