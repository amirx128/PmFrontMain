import EditIcon from "@mui/icons-material/Edit";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import axios from "../../../utils/axios.config";
import {
  Box,
  Button,
  Card,
  Grid as CardGrid,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useRef, useState } from "react";
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
  DownloadApproveQAction,
  GetApproveQAction,
  GetApproveStatesAction,
} from "../../../redux/features/supportSlicer.ts";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import axiosInstance from "../../../utils/axios.config";
import AutoCompleteComponent from "../../../components/AutoComplete/AutoCompleteComponent.tsx";
import TuneIcon from "@mui/icons-material/Tune";
import { LoadingButton } from "@mui/lab";

const SupportList: React.FC<any> = (props) => {
  const dispatch = useDispatch<any>();
  const { approveQ, states } = useSelector(
    (state: any) => state?.support?.approve
  );
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState<any>(new Date());
  const [approveStateValue, setAppriveStateValue] = useState(0);
  const [saveGridColumnsLoading, setSaveGridColumnsLoading] = useState(false);
  const [isShowCustomizeTableModal, setIsShowCustomizeTableModal] =
    useState(false);
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
    approveStateId: 0,
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
    defaultValues: { approveStateId: 0, fromDate: "", toDate: "" },
  });
  const defaultColumns: GridColDef[] = [
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
    },
    {
      field: "newcount",
      headerName: gridDict.newcount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
    },
    {
      field: "purchaseOrderId",
      headerName: gridDict.purchaseOrderId,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
            <Link to={`/purchase/details/${row.purchaseOrderId}`}>{value}</Link>
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
    },
    {
      field: "purchaseCount",
      headerName: gridDict.purchaseCount,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => {
        return <p>{new Intl.NumberFormat().format(+value)}</p>;
      },
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
  const getColumns = useCallback(async () => {
    const res = await axiosInstance.post("/AccountCountroller/GetGridColumns", {
      userId: JSON.parse(localStorage.getItem("user")).id,
      gridName: "SUPPORT_APPROVE-final",
    });
    if (res?.data?.model) {
      const cols = JSON.parse(res.data.model.grigConfigs).sort(
        (a, b) => +a.order - +b.order
      );
      setColumns(
        cols.map((c) =>
          Object.keys(c).includes("renderCell")
            ? { ...c, renderCell: eval("(" + c.renderCell + ")") }
            : c
        )
      );
      setTempColumns(
        cols.map((c) =>
          Object.keys(c).includes("renderCell")
            ? { ...c, renderCell: eval("(" + c.renderCell + ")") }
            : c
        )
      );
    } else {
      setColumns(defaultColumns.map((d, index) => ({ ...d, order: index })));
      setTempColumns(
        defaultColumns.map((d, index) => ({ ...d, order: index }))
      );
    }
  }, []);

  const [columns, setColumns] = useState([]);
  const [tempColumns, setTempColumns] = useState([]);

  useEffect(() => {
    getList();
    getColumns();
  }, []);
  const handleEditClick = (entity) => {
    navigate("/supportApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        GetApproveQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
          approveStateId: approveStateValue,
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
        approveStateId: approveStateValue,
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
          approveStateId: 0,
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
        approveStateId: approveStateValue,
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
  const handleDownloadExcel = async () => {
    const { approveStateId } = getValues();
    await dispatch(
      DownloadApproveQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        approveStateId,
      })
    );
  };
  const onSaveColumnsChanges = async () => {
    setSaveGridColumnsLoading(true);
    try {
      const res = await axiosInstance.post(
        "/AccountCountroller/SaveGridColumn",
        {
          userId: JSON.parse(localStorage.getItem("user")).id,
          gridName: "SUPPORT_APPROVE-final",
          gridConfigs: JSON.stringify(
            tempColumns.map((t) =>
              Object.keys(t).includes("renderCell")
                ? { ...t, renderCell: t.renderCell.toString() }
                : t
            )
          ),
        }
      );
      if (res?.data.model) {
        await getColumns();
        setIsShowCustomizeTableModal(false);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setSaveGridColumnsLoading(false);
    }
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
          title="لیست انتظار تائید درخواست"
          titleTypographyProps={{ variant: "h6" }}
        />

        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <AutoCompleteComponent
                  value={approveStateValue || 0}
                  options={states?.data}
                  dataLabel="state"
                  id="approveStateId"
                  label="وضعیت"
                  changeHandler={(value) => setAppriveStateValue(value)}
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
              <IconButton color="success" onClick={handleDownloadExcel}>
                <SimCardDownloadIcon />
              </IconButton>
              <IconButton
                color="success"
                onClick={() => setIsShowCustomizeTableModal(true)}
              >
                <TuneIcon />
              </IconButton>
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>
        {columns && !approveQ.pending && (
          <>
            <Grid
              onDoubleClick={(e) => handleEditClick(e.row)}
              rowIdFields={["approveStateId", "commodityName", "approverId"]}
              columns={columns}
              rows={approveQ?.data.map((row, index) => ({ id: index, ...row }))}
              pagination={{}}
              onSortModelChange={handleSortModelChange}
            />

            <Dialog
              open={isShowCustomizeTableModal}
              onClose={() => setIsShowCustomizeTableModal(false)}
            >
              <DialogTitle>شخصی سازی ستون ها</DialogTitle>
              <DialogContent className="grid grid-cols-2 gap-x-56 gap-y-6 mt-10">
                {defaultColumns
                  .map((column, index) => ({ ...column, order: index }))
                  .map((column) => (
                    <div
                      key={column.field}
                      className="flex items-center text-center"
                    >
                      <Checkbox
                        checked={tempColumns.some(
                          (c) => c.field === column.field
                        )}
                        onChange={(e) =>
                          setTempColumns((prev) =>
                            e.target.checked
                              ? [column, ...prev]
                              : prev.filter((p) => p.field !== column.field)
                          )
                        }
                      />
                      <p className="w-48">{column.headerName}</p>
                    </div>
                  ))}
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  variant="outlined"
                  color="success"
                  onClick={onSaveColumnsChanges}
                  loading={saveGridColumnsLoading}
                >
                  ذخیره
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={saveGridColumnsLoading}
                  onClick={() => setIsShowCustomizeTableModal(false)}
                >
                  انصراف
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Card>
    </CardGrid>
  );
};
export default SupportList;
