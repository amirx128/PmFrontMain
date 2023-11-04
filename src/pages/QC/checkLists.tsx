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
import { Link, useNavigate } from 'react-router-dom';
import { GetAllCheckListsAction } from '../../redux/features/qcSlicer.ts';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import TuneIcon from '@mui/icons-material/Tune';
import CustomizeGrid from '../../components/CustomizeGrid/CustomizeGrid.tsx';
import useCustomCol from '../../hooks/useCustomCol.tsx';
import { checklistsGrid } from '../../utils/gridColumns.ts';
const ChecklistsListQC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { checkLists } = useSelector((state: any) => state.qc);

  const [selectedSubItems, setSelectedSubItems] = useState([]);
  const [isOpenSubItemsModal, setIsOpenSubItemsModal] =
    useState<boolean>(false);
  const handleEditClick = (params) => {
    navigate(`edit/${params.row.id}`);
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
  } = useCustomCol('QC_CHECKLISTS', checklistsGrid, handleEditClick);
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    dispatch(GetAllCheckListsAction());
  };

  const handleDoubleClick = (e) => {
    navigate(`/warehouse/details/${e.row.warehouseOrderId}`);
  };
  const hanldeOpenSubItemModal = (subItems) => {
    setSelectedSubItems(subItems ?? []);
    setIsOpenSubItemsModal(true);
  };
  const handleCloseSubItemModal = () => {
    setSelectedSubItems([]);
    setIsOpenSubItemsModal(false);
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
        <Box sx={{ display: 'flex', justifyContent: 'end', pr: 10 }}>
          <IconButton color="success" onClick={handleShowCustomizeTabelModal}>
            <TuneIcon />
          </IconButton>
          <Button variant="outlined" onClick={() => navigate('add')}>
            <AddIcon />
            افزودن
          </Button>
        </Box>

        {columns && !checkLists.pending && (
          <>
            <Grid
              columns={columns}
              rows={checkLists?.data ?? []}
              pagination={{}}
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
export default ChecklistsListQC;
