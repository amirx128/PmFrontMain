import { PageTileComponent } from '../../style';
import Filter from '@mui/icons-material/FilterAlt';
import FilterOff from '@mui/icons-material/FilterAltOff';
import {
  Box,
  Card,
  Grid as CardGrid,
  CardHeader,
  IconButton,
} from '@mui/material';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import JalaliDatePicker from '../../../components/date-picker/date-picker';
import { Row } from '../style';
import Grid from '../../../components/grid/grid';
import { useDispatch, useSelector } from 'react-redux';
import gridDict from '../../../dictionary/gridDict.ts';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import {
  GetFinalApproveQAction,
  GetApproveStatesAction,
  DownloadFinalApproveQAction,
} from '../../../redux/features/supportSlicer.ts';
import AutoCompleteComponent from '../../../components/AutoComplete/AutoCompleteComponent.tsx';
import TuneIcon from '@mui/icons-material/Tune';
import CustomizeGrid from '../../../components/CustomizeGrid/CustomizeGrid.tsx';
import useCustomCol from '../../../hooks/useCustomCol.tsx';
import gridFunctionsEnum from '../../../models/gridFunctionsEnum.ts';
import { finalApproveGrid } from '../../../utils/gridColumns.ts';
const FinalApproveRequestList: React.FC<any> = (props) => {
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState<any>(new Date());
  const [approveStateValue, setAppriveStateValue] = useState(0);

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
    defaultValues: { approveStateId: 0, fromDate: '', toDate: '' },
  });

  const handleEditClick = (entity) => {
    navigate('/supportFinalApproveDetail/' + entity.requestCommodityId);
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
    'SUPPORT_FINAL_APPROVE_1',
    finalApproveGrid,
    handleEditClick
  );

  useEffect(() => {
    getList();
  }, []);
  const dispatch = useDispatch<any>();
  const { finalApproveQ, states } = useSelector(
    (state: any) => state?.support?.approve
  );

  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        GetFinalApproveQAction({
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
      GetFinalApproveQAction({
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
        GetFinalApproveQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
          approveStateId: 0,
        })
      );
      await dispatch(GetApproveStatesAction());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e).toLocaleDateString('en-US');
    setFromDate(+date);
    setValue('fromDate', date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toLocaleDateString('en-US');
    setToDate(date);
    setValue('toDate', date);
  };

  const handleAddFilter = async () => {
    await dispatch(
      GetFinalApproveQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        approveStateId: approveStateValue,
      })
    );
  };
  const handleRmoveFilter = async () => {
    await dispatch(
      GetFinalApproveQAction({
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
        approveStateId: initialFilter.current.approveStateId,
      })
    );
  };
  const handleDownloadExcel = async () => {
    await dispatch(
      DownloadFinalApproveQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        approveStateId: approveStateValue,
      })
    );
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
        <PageTileComponent __text={document.title} />

        <CardHeader />

        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: '20px' }}>
                <AutoCompleteComponent
                  value={approveStateValue}
                  options={states?.data}
                  id="approveStateId"
                  dataLabel="state"
                  label="وضعیت"
                  changeHandler={(value) => setAppriveStateValue(value)}
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
              <IconButton color="success" onClick={handleDownloadExcel}>
                <SimCardDownloadIcon />
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
        {columns && !finalApproveQ.pending && (
          <>
            <Grid
              onDoubleClick={(e) => handleEditClick(e.row)}
              columns={columns}
              rows={finalApproveQ?.data.map((row, index) => ({
                id: index,
                ...row,
              }))}
              pagination={{}}
              onSortModelChange={handleSortModelChange}
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
      </Card>
    </CardGrid>
  );
};
export default FinalApproveRequestList;
