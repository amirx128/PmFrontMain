import {
  Box,
  Card,
  CardHeader,
  Grid as CardGrid,
  IconButton,
  Typography,
  Button,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import Grid from "../../components/grid/grid.tsx";
import { useDispatch, useSelector } from "react-redux";
import gridDict from "../../dictionary/gridDict.ts";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AllActiveCheckListsAction,
  ContractorAddDateQAction,
  ContractorAddDateSentItemsAction,
  DeleteQcInstanceAction,
  GetCheckListStatesAction,
  InspectControlCheckListQAction,
  InspectControlCheckListSentItemsAction,
  QcFinalApproveQAction,
  QcFinalApproveSentItemsAction,
  QcManagerControlCheckListQAction,
  QcManagerControlCheckListSentItemsAction,
  SetQcDateQAction,
  SetQcDateSentItemsAction,
  TechnicalApproveScheduleQAction,
  TechnicalApproveScheduleSentItemAction,
} from "../../redux/features/qcSlicer.ts";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Row } from "./style.tsx";
import JalaliDatePicker from "../../components/date-picker/date-picker.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { Controller, useForm } from "react-hook-form";
import SelectComponent from "../../components/select/selects.tsx";
import { LoadingButton } from "@mui/lab";
const QcGrid = ({ mode }) => {
  const modeDict = useRef({
    "contractor-add-date": "منتظر اعلام زمان",
    "contractor-add-date-sent-item": "اعلام زمان شده ها",
    "technical-approve": "دفتر فنی - منتظر تایید",
    "technical-sent-item": "دفتر فنی - تایید شده ها",
    "qc-date": "منتظر اعلام برنامه بازدید",
    "qc-date-sent-item": "اعلام شده",
    "control-checklist": "ثبت چک لیست ها",
    "control-checklist-sent-item": "ثبت شده",
    "manager-control-checklist": "مدیر کیفیت- منتظر تایید",
    "manager-control-checklist-sent-item": "مدیر کیفیت- تایید شده",
    "final-control-checklist": "کنترل کیفیت نهایی- منتظر تایید",
    "final-control-checklist-sent-item": "کنترل کیفیت نهایی- تایید شده",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    checkListStates,
    contractorsAddDateQ,
    contractorsAddDateSentItem,
    technicalApproveScheduleQ,
    technicalApproveScheduleSentItem,
    qcDateQ,
    qcDateSentItem,
    controlCheckListQ,
    controlCheckListSentItem,
    managerControlCheckListQ,
    managerControlCheckListSentItem,
    finalApproveQ,
    finalApproveSentItem,
  } = useSelector((state: any) => state.qc);
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const initialFilter = useRef({
    checkListStateId: 1,
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
  });
  const { control, getValues } = useForm<any>({
    defaultValues: { checkListStateId: 1 },
  });
  const columns: GridColDef[] = [
    {
      field: "checkListId",
      headerName: gridDict.id,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListInstanceId",
      headerName: gridDict.checkListInstanceId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListState",
      headerName: gridDict.checkListState,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListTitle",
      headerName: gridDict.checkListTitle,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListTrackingNumber",
      headerName: gridDict.checkListTrackingNumber,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "placeTitle",
      headerName: gridDict.placeTitle,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "subItemTitle",
      headerName: gridDict.subItemTitle,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
  ];
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    await dispatch(GetCheckListStatesAction());

    switch (mode) {
      case "contractor-add-date":
        await dispatch(ContractorAddDateQAction({}));
        break;
      case "contractor-add-date-sent-item":
        await dispatch(ContractorAddDateSentItemsAction({}));
        break;
      case "technical-approve":
        await dispatch(TechnicalApproveScheduleQAction({}));
        break;
      case "technical-sent-item":
        await dispatch(TechnicalApproveScheduleSentItemAction({}));
        break;
      case "qc-date":
        await dispatch(SetQcDateQAction({}));
        break;
      case "qc-date-sent-item":
        await dispatch(SetQcDateSentItemsAction({}));
        break;
      case "control-checklist":
        await dispatch(InspectControlCheckListQAction({}));
        break;
      case "control-checklist-sent-item":
        await dispatch(InspectControlCheckListSentItemsAction({}));
        break;
      case "manager-control-checklist":
        await dispatch(QcManagerControlCheckListQAction({}));
        break;
      case "manager-control-checklist-sent-item":
        await dispatch(QcManagerControlCheckListSentItemsAction({}));
        break;
      case "final-control-checklist":
        await dispatch(QcFinalApproveQAction({}));
        break;
      case "final-control-checklist-sent-item":
        await dispatch(QcFinalApproveSentItemsAction({}));
        break;
    }
  };

  const handleDoubleClick = (e) => {
    navigate(`edit/${e.row.checkListInstanceId}`);
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
    const { checkListStateId } = getValues();
    const model = {
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      checkListStateId: +checkListStateId,
    };
    switch (mode) {
      case "contractor-add-date":
        await dispatch(ContractorAddDateQAction(model));
        break;
      case "contractor-add-date-sent-item":
        await dispatch(contractorsAddDateSentItem(model));
        break;
      case "technical-approve":
        await dispatch(TechnicalApproveScheduleQAction(model));
        break;
      case "technical-sent-item":
        await dispatch(TechnicalApproveScheduleSentItemAction(model));
        break;
      case "qc-date":
        await dispatch(SetQcDateQAction(model));
        break;
      case "qc-date-sent-item":
        await dispatch(SetQcDateSentItemsAction(model));
        break;
      case "control-checklist":
        await dispatch(InspectControlCheckListQAction(model));
        break;
      case "control-checklist-sent-item":
        await dispatch(InspectControlCheckListSentItemsAction(model));
        break;
      case "manager-control-checklist":
        await dispatch(QcManagerControlCheckListQAction(model));
        break;
      case "manager-control-checklist-sent-item":
        await dispatch(QcManagerControlCheckListSentItemsAction(model));
        break;
      case "final-control-checklist":
        await dispatch(QcFinalApproveQAction(model));
        break;
      case "final-control-checklist-sent-item":
        await dispatch(QcFinalApproveSentItemsAction(model));
        break;
    }
  };
  const handleRmoveFilter = async () => {
    const model = {
      fromDate: new Date(initialFilter.current.fromDate),
      toDate: new Date(initialFilter.current.toDate),
      checkListStateId: +initialFilter.current.checkListStateId,
    };
    switch (mode) {
      case "contractor-add-date":
        await dispatch(ContractorAddDateQAction(model));
        break;
      case "contractor-add-date-sent-item":
        await dispatch(contractorsAddDateSentItem(model));
        break;
      case "technical-approve":
        await dispatch(TechnicalApproveScheduleQAction(model));
        break;
      case "technical-sent-item":
        await dispatch(TechnicalApproveScheduleSentItemAction(model));
        break;
      case "qc-date":
        await dispatch(SetQcDateQAction(model));
        break;
      case "qc-date-sent-item":
        await dispatch(SetQcDateSentItemsAction(model));
        break;
      case "control-checklist":
        await dispatch(InspectControlCheckListQAction(model));
        break;
      case "control-checklist-sent-item":
        await dispatch(InspectControlCheckListSentItemsAction(model));
        break;
      case "manager-control-checklist":
        await dispatch(QcManagerControlCheckListQAction(model));
        break;
      case "manager-control-checklist-sent-item":
        await dispatch(QcManagerControlCheckListSentItemsAction(model));
        break;
      case "final-control-checklist":
        await dispatch(QcFinalApproveQAction(model));
        break;
      case "final-control-checklist-sent-item":
        await dispatch(QcFinalApproveSentItemsAction(model));
        break;
    }
  };

  const renderGrid = () => {
    switch (mode) {
      case "contractor-add-date":
        return (
          <>
            {contractorsAddDateQ?.pending || (
              <Grid
                columns={columns}
                rows={
                  contractorsAddDateQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "contractor-add-date-sent-item":
        return (
          <>
            {contractorsAddDateSentItem?.pending || (
              <Grid
                columns={columns}
                rows={
                  contractorsAddDateSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "technical-approve":
        return (
          <>
            {technicalApproveScheduleQ?.pending || (
              <Grid
                columns={columns}
                rows={
                  technicalApproveScheduleQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "technical-sent-item":
        return (
          <>
            {technicalApproveScheduleSentItem?.pending || (
              <Grid
                columns={columns}
                rows={
                  technicalApproveScheduleSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "qc-date":
        return (
          <>
            {qcDateQ?.pending || (
              <Grid
                columns={columns}
                rows={
                  qcDateQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "qc-date-sent-item":
        return (
          <>
            {qcDateSentItem?.pending || (
              <Grid
                columns={columns}
                rows={
                  qcDateSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "control-checklist":
        return (
          <>
            {controlCheckListQ?.pending || (
              <Grid
                columns={columns}
                rows={
                  controlCheckListQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "control-checklist-sent-item":
        return (
          <>
            {controlCheckListSentItem?.pending || (
              <Grid
                columns={columns}
                rows={
                  controlCheckListSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "manager-control-checklist":
        return (
          <>
            {managerControlCheckListQ?.pending || (
              <Grid
                columns={columns}
                rows={
                  managerControlCheckListQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "manager-control-checklist-sent-item":
        return (
          <>
            {managerControlCheckListSentItem?.pending || (
              <Grid
                columns={columns}
                rows={
                  managerControlCheckListSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "final-control-checklist":
        return (
          <>
            {finalApproveQ?.pending || (
              <Grid
                columns={columns}
                rows={
                  finalApproveQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case "final-control-checklist-sent-item":
        return (
          <>
            {finalApproveSentItem?.pending || (
              <Grid
                columns={columns}
                rows={
                  finalApproveSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
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
          title={modeDict.current[mode]}
          titleTypographyProps={{ variant: "h6" }}
        />
        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <Controller
                  control={control}
                  rules={{ required: " approve state is required" }}
                  name="checkListStateId"
                  defaultValue={0}
                  render={({ field }) => (
                    <SelectComponent
                      label="وضعیت"
                      valuefieldName="id"
                      labelFieldName="state"
                      options={checkListStates.data}
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
              {/* <IconButton color="success" onClick={handleDownloadExcel}>
                <SimCardDownloadIcon />
              </IconButton> */}
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>

        {renderGrid()}
      </Card>
    </CardGrid>
  );
};
export default QcGrid;
