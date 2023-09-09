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
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SelectComponent from "../../../components/select/selects";
import JalaliDatePicker from "../../../components/date-picker/date-picker";
import { Row } from "./style";
import Grid from "../../../components/grid/grid";
import { useDispatch, useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../../utils/functions.ts";
import gridDict from "../../../dictionary/gridDict.ts";
import {
  GetApproveQAction,
  GetApproveStatesAction,
} from "../../../redux/features/supportSlicer.ts";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

const ApprovedList: React.FC<any> = (props) => {
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState<any>(new Date());
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
    approveStateId: 1,
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<any>({
    defaultValues: { approveStateId: 1, fromDate: "", toDate: "" },
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
      field: "requestCaseId",
      headerName: gridDict.requestCaseId,
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
      field: "requesterUserId",
      headerName: gridDict.requesterUserId,
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
      field: "trackingCode",
      headerName: gridDict.trackingCode,
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
      headerName: gridDict.isEditable,
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
      headerName: gridDict.createDate,
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
      field: "placeOfUseName",
      headerName: gridDict.placeOfUseName,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCommodityId",
      headerName: gridDict.requestCommodityId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "approvestate",
      headerName: gridDict.approveDate,
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
        }
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
    {
      field: "actions",
      headerName: gridDict.actions,
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
  }, []);
  const dispatch = useDispatch<any>();
  const { approveQ, states } = useSelector(
    (state: any) => state?.support?.approve
  );

  const handleEditClick = (entity) => {
    navigate("/supportApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = async (sortArr) => {
    const { approveStateId } = getValues();
    if (!sortArr.at(0)) {
      await dispatch(
        GetApproveQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
          approveStateId,
        })
      );
      return;
    }
    const sortField = sortArr?.at(0).field;
    const sortType = sortArr?.at(0).sort;
    await dispatch(
      GetApproveQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        approveStateId,
        orderBy: sortField,
        orderType: sortType,
      })
    );
  };
  const getList = async () => {
    try {
      await dispatch(
        GetApproveQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
          approveStateId: 1,
        })
      );
      await dispatch(GetApproveStatesAction());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e).toLocaleDateString("en-US");
    setFromDate(+date);
    setValue("fromDate", date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toLocaleDateString("en-US");
    setToDate(date);
    setValue("toDate", date);
  };

  const handleAddFilter = async () => {
    const { approveStateId } = getValues();
    await dispatch(
      GetApproveQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        approveStateId,
      })
    );
  };
  const handleRmoveFilter = async () => {
    await dispatch(
      GetApproveQAction({
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
        approveStateId: initialFilter.current.approveStateId,
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
          title="لیست تایید پشتیبانی"
          titleTypographyProps={{ variant: "h6" }}
        />

        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <Controller
                  control={control}
                  rules={{ required: " approve state is required" }}
                  name="approveStateId"
                  defaultValue={0}
                  render={({ field }) => (
                    <SelectComponent
                      label="وضعیت"
                      valuefieldName="id"
                      labelFieldName="state"
                      options={states?.data}
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
                  value={fromDate}
                ></JalaliDatePicker>
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePicker
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="toDate"
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
              <IconButton color="success">
                <SimCardDownloadIcon />
              </IconButton>
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>
        <Grid
          onDoubleClick={(e) => handleEditClick(e.row)}
          rowIdFields={["approveStateId", "commodityName", "approverId"]}
          columns={columns}
          rows={approveQ?.data.map((row, index) => ({ id: index, ...row }))}
          pagination={{}}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default ApprovedList;
