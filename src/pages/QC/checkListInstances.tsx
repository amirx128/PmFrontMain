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
} from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import Grid from '../../components/grid/grid.tsx';
import { useDispatch, useSelector } from 'react-redux';
import gridDict from '../../dictionary/gridDict.ts';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AllActiveCheckListsAction,
  DeleteQcInstanceAction,
  GetControlCheckListStatesAction,
} from '../../redux/features/qcSlicer.ts';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Row } from './style.tsx';
import JalaliDatePicker from '../../components/date-picker/date-picker.tsx';
import Filter from '@mui/icons-material/FilterAlt';
import FilterOff from '@mui/icons-material/FilterAltOff';
import { Controller, useForm } from 'react-hook-form';
import SelectComponent from '../../components/select/selects.tsx';
import { LoadingButton } from '@mui/lab';
import TuneIcon from '@mui/icons-material/Tune';
import CustomizeGrid from '../../components/CustomizeGrid/CustomizeGrid.tsx';
import useCustomCol from '../../hooks/useCustomCol.tsx';
import { checklistInstancesGrid } from '../../utils/gridColumns.ts';
const CheckListInstancesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    checkListInstances,
    checkListInstancRemoveState,
    controlChecklistStates,
  } = useSelector((state: any) => state.qc);
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
  const handleEditClick = (params) => {
    navigate(`edit/${params.row.checkListInstanceId}`);
  };
  const {
    isLoading: saveGridColumnsLoading,
    isShowModal: isShowCustomizeTableModal,
    handleShowModal: handleShowCustomizeTabelModal,
    columns,
    tempColumns,
    handleChangeCheckbox,
    handleChangeSort,
    handleCloseModal: handleCloseCustomizeTable,
    handleSaveColumnsChanges,
    handleSelectAll,
  } = useCustomCol(
    'QC_CHECKLIST_INSTANCES',
    checklistInstancesGrid,
    handleEditClick
  );

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    dispatch(AllActiveCheckListsAction({}));
    dispatch(GetControlCheckListStatesAction());
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
        boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
        marginBottom: '10px',
      }}
    >
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          style={{ textAlign: 'right' }}
          title="چک لیست ها"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: '20px' }}>
                <Controller
                  control={control}
                  rules={{ required: ' approve state is required' }}
                  name="checkListStateId"
                  defaultValue={0}
                  render={({ field }) => (
                    <SelectComponent
                      label="وضعیت"
                      valuefieldName="id"
                      labelFieldName="state"
                      options={controlChecklistStates.data}
                      field={field}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1, marginLeft: '20px' }}>
                <JalaliDatePicker
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="fromDate"
                  label="از تاریخ"
                  value={fromDate}
                ></JalaliDatePicker>
              </Box>
              <Box sx={{ flex: 1, marginLeft: '20px' }}>
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
              <IconButton
                color="success"
                onClick={handleShowCustomizeTabelModal}
              >
                <TuneIcon />
              </IconButton>
              {/* <IconButton color="success" onClick={handleDownloadExcel}>
                <SimCardDownloadIcon />
              </IconButton> */}
              <Box sx={{ flex: 1, marginLeft: '20px' }}></Box>
            </Row>
          </form>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'end', pr: 10, gap: 5 }}>
          <Button variant="outlined" onClick={() => navigate('add')}>
            <AddIcon />
            افزودن
          </Button>
          <Button
            variant="outlined"
            onClick={() => setWarningREmoveModal(true)}
            color="error"
            disabled={!idsDelete.length}
          >
            <DeleteIcon />
            حذف موارد انتخابی
          </Button>
        </Box>
        {columns && !checkListInstances.pending && (
          <>
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
            />
            <CustomizeGrid
              showModal={isShowCustomizeTableModal}
              columns={tempColumns}
              handleChangeCheckbox={handleChangeCheckbox}
              handleChangeSort={handleChangeSort}
              handleClose={handleCloseCustomizeTable}
              handleSave={handleSaveColumnsChanges}
              handleSelectAll={handleSelectAll}
              isSaveLoading={saveGridColumnsLoading}
            />
          </>
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
