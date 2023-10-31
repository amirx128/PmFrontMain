import {
  Box,
  Card,
  Grid as CardGrid,
  CardHeader,
  Dialog,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import JalaliDatePicker from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import { ColumnGrid, Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import gridDict from "../../dictionary/gridDict.ts";
import {
  DownloadRequesterUserQAction,
  GetRequesterUserQAction,
} from "../../redux/features/productSlicer.ts";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

import TuneIcon from "@mui/icons-material/Tune";
import CustomizeGrid from "../../components/CustomizeGrid/CustomizeGrid.tsx";
import useCustomCol from "../../hooks/useCustomCol.tsx";
import { requesterUserGrid } from "../../utils/gridColumns.ts";
const RequesterUser = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
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
  } = useCustomCol("REQUESTER_USER", requesterUserGrid);
  useEffect(() => {
    getList();
  }, []);

  const { requesterUserQ } = useSelector(
    (state: any) => state?.product?.requesterUser
  );
  const dispatch = useDispatch<any>();

  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        GetRequesterUserQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
        })
      );
      return;
    }
    const sortField = sortArr?.at(0).field;
    const sortType = sortArr?.at(0).sort;
    await dispatch(
      GetRequesterUserQAction({
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
        GetRequesterUserQAction({
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
      GetRequesterUserQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      })
    );
  };
  const handleRmoveFilter = async () => {
    await dispatch(
      GetRequesterUserQAction({
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
      })
    );
  };
  const handleDoubleClick = (e) => {
    navigate(`/requesterUser/details/${e.row.exitWarehouseOrderId}`);
  };
  const handleDownloadExcel = async () => {
    dispatch(
      DownloadRequesterUserQAction({
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
          title="لیست حواله های دریافتی"
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
              <IconButton onClick={handleDownloadExcel} color="success">
                <SimCardDownloadIcon />
              </IconButton>
              <IconButton
                color="success"
                onClick={handleShowCustomizeTabelModal}
              >
                <TuneIcon />
              </IconButton>
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>

        {columns && !requesterUserQ.pending && (
          <>
            <Grid
              columns={columns}
              rows={
                requesterUserQ?.data.map((row, index) => ({
                  id: index,
                  ...row,
                })) ?? []
              }
              pagination={{}}
              onSortModelChange={handleSortModelChange}
              onDoubleClick={handleDoubleClick}
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
export default RequesterUser;
