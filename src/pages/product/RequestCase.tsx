import {
  Box,
  Card,
  Grid as CardGrid,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import JalaliDatePicker from '../../components/date-picker/date-picker.tsx';
import Grid from '../../components/grid/grid.tsx';
import { Row } from './style.tsx';
import Filter from '@mui/icons-material/FilterAlt';
import FilterOff from '@mui/icons-material/FilterAltOff';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  DownloadRequesterUserSentItemAction,
  RequesterUserSentItemAction,
} from '../../redux/features/productSlicer.ts';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import TuneIcon from '@mui/icons-material/Tune';
import CustomizeGrid from '../../components/CustomizeGrid/CustomizeGrid.tsx';
import useCustomCol from '../../hooks/useCustomCol.tsx';
import { requestCaseGrid } from '../../utils/gridColumns.ts';
const RequestCase = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
  });
  const handleEditClick = (params) => {
    navigate(`edit/${params.row.requestCaseId}`);
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
  } = useCustomCol('REQUEST_CASE_SENT_ITEM', requestCaseGrid, handleEditClick);
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
      console.error('Error fetching data:', error);
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
        boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
        marginBottom: '10px',
      }}
    >
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          style={{ textAlign: 'right' }}
          title="لیست درخواست های ارسال شده"
          titleTypographyProps={{ variant: 'h6' }}
        />

        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: '20px' }}>
                <JalaliDatePicker
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  value={fromDate}
                ></JalaliDatePicker>
              </Box>
              <Box sx={{ flex: 1, marginLeft: '20px' }}>
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

        {columns && !requestUserSentItem.pending && (
          <>
            <Grid
              columns={columns}
              rows={
                requestUserSentItem?.data.map((row, index) => ({
                  id: index,
                  ...row,
                })) ?? []
              }
              pagination={{}}
              onSortModelChange={handleSortModelChange}
              onDoubleClick={handleEditClick}
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
export default RequestCase;
