import {
  Box,
  Card,
  CardHeader,
  Grid as CardGrid,
  IconButton,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Grid from '../../components/grid/grid.tsx';
import { useDispatch, useSelector } from 'react-redux';
import gridDict from '../../dictionary/gridDict.ts';
import { useNavigate } from 'react-router-dom';
import {
  ContractorAddDateQAction,
  ContractorAddDateSentItemsAction,
  ContractorSetIsDoneQAction,
  ContractorSetIsDoneSentItemsAction,
  GetCheckListStatesAction,
  InspectControlCheckListQAction,
  InspectControlCheckListSentItemsAction,
  InspectorEntryCheckListQAction,
  InspectorEntryCheckListSentItemsAction,
  QcFinalApproveQAction,
  QcFinalApproveSentItemsAction,
  QcManagerControlCheckListQAction,
  QcManagerControlCheckListSentItemsAction,
  SetQcDateQAction,
  SetQcDateSentItemsAction,
  TechnicalApproveScheduleQAction,
  TechnicalApproveScheduleSentItemAction,
  TechnicalOfficeAddOrdersQAction,
  TechnicalOfficeAddOrdersSentItemsAction,
} from '../../redux/features/qcSlicer.ts';
import { Row } from './style.tsx';
import JalaliDatePicker from '../../components/date-picker/date-picker.tsx';
import Filter from '@mui/icons-material/FilterAlt';
import FilterOff from '@mui/icons-material/FilterAltOff';
import { Controller, useForm } from 'react-hook-form';
import SelectComponent from '../../components/select/selects.tsx';
import TuneIcon from '@mui/icons-material/Tune';
import CustomizeGrid from '../../components/CustomizeGrid/CustomizeGrid.tsx';
import useCustomCol from '../../hooks/useCustomCol.tsx';
import { qcGrid } from '../../utils/gridColumns.ts';
const modeDict = {
  'contractor-add-date': 'منتظر اعلام زمان',
  'contractor-add-date-sent-item': 'اعلام زمان شده ها',
  'technical-approve': 'دفتر فنی - منتظر تایید',
  'technical-sent-item': 'دفتر فنی - تایید شده ها',
  'qc-date': 'منتظر اعلام برنامه بازدید',
  'qc-date-sent-item': 'اعلام شده',
  'control-checklist': 'ثبت چک لیست ها',
  'control-checklist-sent-item': 'ثبت شده',
  'manager-control-checklist': 'مدیر کیفیت- منتظر تایید',
  'manager-control-checklist-sent-item': 'مدیر کیفیت- تایید شده',
  'final-control-checklist': 'کنترل کیفیت نهایی- منتظر تایید',
  'final-control-checklist-sent-item': 'کنترل کیفیت نهایی- تایید شده',
  'entry-checklist': 'کارمند کیفیت- تایید شده',
  'entry-checklist-sent-item': 'کارمند کیفیت- تایید شده',
  'contractor-set-is-done': 'منتظر اعلام انجام',
  'contractor-set-is-done-sent-item': 'اعلام شده',
  'technical-office': 'منتظر دستور',
  'technical-office-sent-item': 'دستور داده شده',
};
const initialFilter = {
  checkListStateId: 1,
  fromDate: new Date().setMonth(new Date().getMonth() - 1),
  toDate: new Date(),
};
const QcGrid = ({ mode }) => {
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
    entryCheckListQ,
    entryCheckListSentItem,
    contractorSetIsDoneQ,
    contractorSetIsDoneSentItem,
    technicalOfficeAddOrdersQ,
    technicalOfficeAddOrdersSentItem,
  } = useSelector((state: any) => state.qc);
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());

  const { control, getValues } = useForm<any>({
    defaultValues: { checkListStateId: 1 },
  });
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
  } = useCustomCol(`QC_${mode}`, qcGrid);

  const getList = useCallback(async () => {
    await dispatch(GetCheckListStatesAction());
    switch (mode) {
      case 'contractor-add-date':
        await dispatch(ContractorAddDateQAction({}));
        break;
      case 'contractor-add-date-sent-item':
        await dispatch(ContractorAddDateSentItemsAction({}));
        break;
      case 'technical-approve':
        await dispatch(TechnicalApproveScheduleQAction({}));
        break;
      case 'technical-sent-item':
        await dispatch(TechnicalApproveScheduleSentItemAction({}));
        break;
      case 'qc-date':
        await dispatch(SetQcDateQAction({}));
        break;
      case 'qc-date-sent-item':
        await dispatch(SetQcDateSentItemsAction({}));
        break;
      case 'control-checklist':
        await dispatch(InspectControlCheckListQAction({}));
        break;
      case 'control-checklist-sent-item':
        await dispatch(InspectControlCheckListSentItemsAction({}));
        break;
      case 'manager-control-checklist':
        await dispatch(QcManagerControlCheckListQAction({}));
        break;
      case 'manager-control-checklist-sent-item':
        await dispatch(QcManagerControlCheckListSentItemsAction({}));
        break;
      case 'final-control-checklist':
        await dispatch(QcFinalApproveQAction({}));
        break;
      case 'final-control-checklist-sent-item':
        await dispatch(QcFinalApproveSentItemsAction({}));
        break;
      case 'entry-checklist':
        await dispatch(InspectorEntryCheckListQAction({}));
        break;
      case 'entry-checklist-sent-item':
        await dispatch(InspectorEntryCheckListSentItemsAction({}));
        break;
      case 'contractor-set-is-done':
        await dispatch(ContractorSetIsDoneQAction({}));
        break;
      case 'contractor-set-is-done-sent-item':
        await dispatch(ContractorSetIsDoneSentItemsAction({}));
        break;
      case 'technical-office':
        await dispatch(TechnicalOfficeAddOrdersQAction({}));
        break;
      case 'technical-office-sent-item':
        await dispatch(TechnicalOfficeAddOrdersSentItemsAction({}));
        break;
    }
  }, [dispatch, mode]);

  useEffect(() => {
    getList();
  }, [getList]);

  const handleDoubleClick = (e) => {
    if (
      [
        'entry-checklist',
        'entry-checklist-sent-item',
        'contractor-set-is-done',
        'contractor-set-is-done-sent-item',
        'technical-office',
        'technical-office-sentitem',
      ].includes(mode)
    ) {
      window.open(
        `/qc/entryChecklist/${e.row.checkListInstanceId}/${mode}`,
        '_blank'
      );
      return;
    }
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
      case 'contractor-add-date':
        await dispatch(ContractorAddDateQAction(model));
        break;
      case 'contractor-add-date-sent-item':
        await dispatch(contractorsAddDateSentItem(model));
        break;
      case 'technical-approve':
        await dispatch(TechnicalApproveScheduleQAction(model));
        break;
      case 'technical-sent-item':
        await dispatch(TechnicalApproveScheduleSentItemAction(model));
        break;
      case 'qc-date':
        await dispatch(SetQcDateQAction(model));
        break;
      case 'qc-date-sent-item':
        await dispatch(SetQcDateSentItemsAction(model));
        break;
      case 'control-checklist':
        await dispatch(InspectControlCheckListQAction(model));
        break;
      case 'control-checklist-sent-item':
        await dispatch(InspectControlCheckListSentItemsAction(model));
        break;
      case 'manager-control-checklist':
        await dispatch(QcManagerControlCheckListQAction(model));
        break;
      case 'manager-control-checklist-sent-item':
        await dispatch(QcManagerControlCheckListSentItemsAction(model));
        break;
      case 'final-control-checklist':
        await dispatch(QcFinalApproveQAction(model));
        break;
      case 'final-control-checklist-sent-item':
        await dispatch(QcFinalApproveSentItemsAction(model));
        break;
      case 'entry-checklist':
        await dispatch(InspectorEntryCheckListQAction(model));
        break;
      case 'entry-checklist-sent-item':
        await dispatch(InspectorEntryCheckListSentItemsAction(model));
        break;
      case 'contractor-set-is-done':
        await dispatch(ContractorSetIsDoneQAction(model));
        break;
      case 'contractor-set-is-done-sent-item':
        await dispatch(ContractorSetIsDoneSentItemsAction(model));
        break;
      case 'technical-office':
        await dispatch(TechnicalOfficeAddOrdersQAction(model));
        break;
      case 'technical-office-sent-item':
        await dispatch(TechnicalOfficeAddOrdersSentItemsAction(model));
        break;
    }
  };
  const handleRmoveFilter = async () => {
    const model = {
      fromDate: new Date(initialFilter.fromDate),
      toDate: new Date(initialFilter.toDate),
      checkListStateId: +initialFilter.checkListStateId,
    };
    switch (mode) {
      case 'contractor-add-date':
        await dispatch(ContractorAddDateQAction(model));
        break;
      case 'contractor-add-date-sent-item':
        await dispatch(contractorsAddDateSentItem(model));
        break;
      case 'technical-approve':
        await dispatch(TechnicalApproveScheduleQAction(model));
        break;
      case 'technical-sent-item':
        await dispatch(TechnicalApproveScheduleSentItemAction(model));
        break;
      case 'qc-date':
        await dispatch(SetQcDateQAction(model));
        break;
      case 'qc-date-sent-item':
        await dispatch(SetQcDateSentItemsAction(model));
        break;
      case 'control-checklist':
        await dispatch(InspectControlCheckListQAction(model));
        break;
      case 'control-checklist-sent-item':
        await dispatch(InspectControlCheckListSentItemsAction(model));
        break;
      case 'manager-control-checklist':
        await dispatch(QcManagerControlCheckListQAction(model));
        break;
      case 'manager-control-checklist-sent-item':
        await dispatch(QcManagerControlCheckListSentItemsAction(model));
        break;
      case 'final-control-checklist':
        await dispatch(QcFinalApproveQAction(model));
        break;
      case 'final-control-checklist-sent-item':
        await dispatch(QcFinalApproveSentItemsAction(model));
        break;
      case 'entry-checklist':
        await dispatch(InspectorEntryCheckListQAction(model));
        break;
      case 'entry-checklist-sent-item':
        await dispatch(InspectorEntryCheckListSentItemsAction(model));
        break;
      case 'contractor-set-is-done':
        await dispatch(ContractorSetIsDoneQAction(model));
        break;
      case 'contractor-set-is-done-sent-item':
        await dispatch(ContractorSetIsDoneSentItemsAction(model));
        break;
      case 'technical-office':
        await dispatch(TechnicalOfficeAddOrdersQAction(model));
        break;
      case 'technical-office-sent-item':
        await dispatch(TechnicalOfficeAddOrdersSentItemsAction(model));
        break;
    }
  };
  const renderGrid = () => {
    switch (mode) {
      case 'contractor-add-date':
        return (
          <>
            {columns && !contractorsAddDateQ.pending && (
              <Grid
                columns={columns}
                rows={
                  contractorsAddDateQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'contractor-add-date-sent-item':
        return (
          <>
            {columns && !contractorsAddDateSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  contractorsAddDateSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'technical-approve':
        return (
          <>
            {columns && !technicalApproveScheduleQ.pending && (
              <Grid
                columns={columns}
                rows={
                  technicalApproveScheduleQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'technical-sent-item':
        return (
          <>
            {columns && !technicalApproveScheduleSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  technicalApproveScheduleSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'qc-date':
        return (
          <>
            {columns && !qcDateQ.pending && (
              <Grid
                columns={columns}
                rows={
                  qcDateQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'qc-date-sent-item':
        return (
          <>
            {columns && !qcDateSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  qcDateSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'control-checklist':
        return (
          <>
            {columns && !controlCheckListQ.pending && (
              <Grid
                columns={columns}
                rows={
                  controlCheckListQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'control-checklist-sent-item':
        return (
          <>
            {columns && !controlCheckListSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  controlCheckListSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'manager-control-checklist':
        return (
          <>
            {columns && !managerControlCheckListQ.pending && (
              <Grid
                columns={columns}
                rows={
                  managerControlCheckListQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'manager-control-checklist-sent-item':
        return (
          <>
            {columns && !managerControlCheckListSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  managerControlCheckListSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'final-control-checklist':
        return (
          <>
            {columns && !finalApproveQ.pending && (
              <Grid
                columns={columns}
                rows={
                  finalApproveQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'final-control-checklist-sent-item':
        return (
          <>
            {columns && !finalApproveSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  finalApproveSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'entry-checklist':
        return (
          <>
            {entryCheckListQ?.pending || (
              <Grid
                columns={columns}
                rows={
                  entryCheckListQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'entry-checklist-sent-item':
        return (
          <>
            {columns && !entryCheckListSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  entryCheckListSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'contractor-set-is-done':
        return (
          <>
            {columns && !contractorSetIsDoneQ.pending && (
              <Grid
                columns={columns}
                rows={
                  contractorSetIsDoneQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'contractor-set-is-done-sent-item':
        return (
          <>
            {columns && !contractorSetIsDoneSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  contractorSetIsDoneSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'technical-office':
        return (
          <>
            {columns && !technicalOfficeAddOrdersQ.pending && (
              <Grid
                columns={columns}
                rows={
                  technicalOfficeAddOrdersQ?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
                onDoubleClick={handleDoubleClick}
              />
            )}
          </>
        );
      case 'technical-office-sent-item':
        return (
          <>
            {columns && !technicalOfficeAddOrdersSentItem.pending && (
              <Grid
                columns={columns}
                rows={
                  technicalOfficeAddOrdersSentItem?.data.map((rows, index) => ({
                    ...rows,
                    id: rows.checkListInstanceId,
                  })) ?? []
                }
                pagination={{}}
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
        boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
        marginBottom: '10px',
      }}
    >
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          style={{ textAlign: 'right' }}
          title={modeDict[mode]}
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
                      options={checkListStates.data}
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
              <Box sx={{ flex: 1, marginLeft: '20px' }}></Box>
            </Row>
          </form>
        </Box>

        {renderGrid()}
        {columns && (
          <>
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
      </Card>
    </CardGrid>
  );
};
export default QcGrid;
