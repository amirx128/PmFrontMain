import {
  Box,
  Card,
  CardHeader,
  Grid as CardGrid,
  IconButton,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { JalaliDatePickerNew } from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import { Row } from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import { useDispatch, useSelector } from "react-redux";
import {
  DownloadSupplierQAction,
  GetSupplierQAction,
} from "../../redux/features/supplierSlicer.ts";
import gridDict from "../../dictionary/gridDict.ts";
import { Link, useNavigate } from "react-router-dom";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import TuneIcon from "@mui/icons-material/Tune";
import CustomizeGrid from "../../components/CustomizeGrid/CustomizeGrid.tsx";
import useCustomCol from "../../hooks/useCustomCol.tsx";
import { warehouseGrid } from "../../utils/gridColumns.ts";
const SupplierQList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { supplierQ } = useSelector((state: any) => state.supplier?.supplier);
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
  } = useCustomCol("SUPPLIER_SUPPLIER_QUEUE_LIST", warehouseGrid);
  useEffect(() => {
    getList();
  }, []);

  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await dispatch(
        GetSupplierQAction({
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
        })
      );
      return;
    }
    const sortField = sortArr?.at(0).field;
    const sortType = sortArr?.at(0).sort;
    await dispatch(
      GetSupplierQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        orderBy: sortField,
        orderType: sortType,
      })
    );
  };
  const getList = async () => {
    const body = {
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
    };
    dispatch(GetSupplierQAction(body));
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
      GetSupplierQAction({
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      })
    );
  };

  const handleRmoveFilter = async () => {
    await dispatch(
      GetSupplierQAction({
        fromDate: new Date(initialFilter.current.fromDate),
        toDate: new Date(initialFilter.current.toDate),
      })
    );
  };
  const handleDoubleClick = (e) => {
    navigate(`/supplier/details/${e.row.warehouseOrderId}`);
  };
  const handleDownloadExcell = async () => {
    await dispatch(
      DownloadSupplierQAction({
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
          title="لیست انتظار بررسی تامین کننده"
          titleTypographyProps={{ variant: "h6" }}
        />

        <Box>
          <form>
            <Row>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePickerNew
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  value={fromDate}
                ></JalaliDatePickerNew>
              </Box>
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <JalaliDatePickerNew
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ "
                  value={toDate}
                ></JalaliDatePickerNew>
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
              <IconButton color="success" onClick={handleDownloadExcell}>
                <SimCardDownloadIcon />
              </IconButton>
              <Box sx={{ flex: 1, marginLeft: "20px" }}></Box>
            </Row>
          </form>
        </Box>

        {columns && !supplierQ.pending && (
          <>
            <Grid
              onDoubleClick={handleDoubleClick}
              columns={columns}
              rows={
                supplierQ?.data.map((row, index) => ({ id: index, ...row })) ??
                []
              }
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
export default SupplierQList;
