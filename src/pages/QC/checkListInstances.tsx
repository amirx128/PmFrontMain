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
  DeleteQcInstanceAction,
  GetCheckListStatesAction,
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
const CheckListInstancesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { checkListInstances, checkListStates, checkListInstancRemoveState } =
    useSelector((state: any) => state.qc);
  const [warningRemoveModal, setWarningREmoveModal] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const [idsDelete, setIdsDelete] = useState<number[]>([]);
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
            onClick={() => navigate(`edit/${params.row.checkListInstanceId}`)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            className="textPrimary"
            onClick={() => {
              setIdsDelete([params.row.checkListInstanceId]);
              setWarningREmoveModal(true);
            }}
            color="error"
          />
        </>
      ),
    },
  ];
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    dispatch(AllActiveCheckListsAction({}));
    dispatch(GetCheckListStatesAction());
  };

  const handleDoubleClick = (e) => {
    navigate(`/warehouse/details/${e.row.warehouseOrderId}`);
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
    await dispatch(
      AllActiveCheckListsAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        checkListStateId: +checkListStateId,
      })
    );
  };
  const handleRmoveFilter = async () => {
    await dispatch(
      AllActiveCheckListsAction({
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
        checkListStateId: +initialFilter.current.checkListStateId,
      })
    );
  };
  const handleDeleteItems = async () => {
    if (idsDelete.length) {
      await dispatch(DeleteQcInstanceAction({ instanceIds: idsDelete }));
      setWarningREmoveModal(false);
      await dispatch(AllActiveCheckListsAction({ fromDate, toDate }));
      setIdsDelete([]);
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
          title="چک لیست ها"
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

        <Box sx={{ display: "flex", justifyContent: "end", pr: 10, gap: 5 }}>
          <Button variant="outlined" onClick={() => navigate("add")}>
            <AddIcon />
            افزودن
          </Button>
          <Button
            variant="outlined"
            onClick={() => setWarningREmoveModal(true)}
            color="error"
          >
            <DeleteIcon />
            حذف موارد انتخابی
          </Button>
        </Box>
        {checkListInstances?.pending || (
          <Grid
            columns={columns}
            rows={
              checkListInstances?.data.map((rows, index) => ({
                ...rows,
                id: rows.checkListInstanceId,
              })) ?? []
            }
            pagination={{}}
            onRowSelected={(e) => setIdsDelete(e)}
            // onDoubleClick={handleDoubleClick}
          />
        )}

        <Dialog
          open={warningRemoveModal}
          onClose={() => setWarningREmoveModal(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              آیا از حذف مورد انتخابی اطمینان دارید؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setWarningREmoveModal(false)}>انصراف</Button>
            <LoadingButton
              onClick={handleDeleteItems}
              loading={checkListInstancRemoveState.pending}
            >
              تایید
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Card>
    </CardGrid>
  );
};
export default CheckListInstancesList;
