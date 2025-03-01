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
import { useEffect, useReducer } from 'react';
import Grid from '../../components/grid/grid.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllSubItemsAction } from '../../redux/features/qcSlicer.ts';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import CustomizeGrid from '../../components/CustomizeGrid/CustomizeGrid.tsx';
import useCustomCol from '../../hooks/useCustomCol.tsx';
import { subItemsGrid } from '../../utils/gridColumns.ts';
interface IInitialStateReducer {
  selectedCheckLists: any[];
  isOpenCheckListsModal: boolean;
  selectedFloors: any[];
  isOpenFloorsModal: boolean;
  selectdProjects: any[];
  isOpenProjectsModal: boolean;
  selectdUnits: any[];
  isOpenUnitsModal: boolean;
  selectedRelatedCheckLists: any[];
  isOpenRelatedCheckListsModal: boolean;
  selectedRelatedFloors: any[];
  isOpenRelatedFloorsModal: boolean;
  selectdRelatedProjects: any[];
  isOpenRelatedProjectsModal: boolean;
  selectdRelatedUnits: any[];
  isOpenRelatedUnitsModal: boolean;
  modal: string;
  type: string;
  name: string;
  data: string;
}
const initialStateReducer: IInitialStateReducer = {
  selectdProjects: [],
  selectdRelatedProjects: [],
  selectdRelatedUnits: [],
  selectdUnits: [],
  selectedCheckLists: [],
  selectedFloors: [],
  selectedRelatedCheckLists: [],
  selectedRelatedFloors: [],
  isOpenCheckListsModal: false,
  isOpenFloorsModal: false,
  isOpenProjectsModal: false,
  isOpenRelatedCheckListsModal: false,
  isOpenRelatedFloorsModal: false,
  isOpenRelatedProjectsModal: false,
  isOpenRelatedUnitsModal: false,
  isOpenUnitsModal: false,
  modal: '',
  type: '',
  name: '',
  data: '',
};
const reducer: any = (
  state: IInitialStateReducer,
  action: {
    type: string;
    payload?: any;
  }
) => {
  switch (action.type) {
    case 'CHECKLISTS':
      return {
        ...state,
        modal: 'isOpenCheckListsModal',
        type: 'CHECKLISTS',
        name: 'چک لیست ها',
        data: 'selectedCheckLists',
        selectedCheckLists: action.payload.data,
        isOpenCheckListsModal: action.payload.showModal,
      };
    case 'FLOORS':
      return {
        ...state,
        modal: 'isOpenFloorsModal',
        type: 'FLOORS',
        name: 'طبقات',
        data: 'selectedFloors',
        selectedFloors: action.payload.data,
        isOpenFloorsModal: action.payload.showModal,
      };
    case 'PROJECTS':
      return {
        ...state,
        modal: 'isOpenProjectsModal',
        type: 'PROJECTS',
        name: 'پروژه ها',
        data: 'selectedProjects',
        selectedProjects: action.payload.data,
        isOpenProjectsModal: action.payload.showModal,
      };
    case 'UNITS':
      return {
        ...state,
        modal: 'isOpenUnitsModal',
        type: 'UNITS',
        name: 'واحد ها',
        data: 'selectedUnits',
        selectedUnits: action.payload.data,
        isOpenUnitsModal: action.payload.showModal,
      };
    case 'RELATED_CHECKLISTS':
      return {
        ...state,
        modal: 'isOpenRelatedCheckListsModal',
        type: 'RELATED_CHECKLISTS',
        name: 'چک لیست های مرتبط',
        data: 'selectedRelatedCheckLists',
        selectedRelatedCheckLists: action.payload.data,
        isOpenRelatedCheckListsModal: action.payload.showModal,
      };
    case 'RELATED_FLOORS':
      return {
        ...state,
        modal: 'isOpenRelatedFloorsModal',
        type: 'RELATED_FLOORS',
        name: 'طبقات مرتبط',
        data: 'selectedRelatedFloors',
        selectedRelatedFloors: action.payload.data,
        isOpenRelatedFloorsModal: action.payload.showModal,
      };
    case 'RELATED_PROJECTS':
      return {
        ...state,
        modal: 'isOpenRelatedProjectsModal',
        type: 'RELATED_PROJECTS',
        name: 'پروژه های مرتبط',
        data: 'selectedRelatedProjects',
        selectedRelatedProjects: action.payload.data,
        isOpenRelatedProjectsModal: action.payload.showModal,
      };
    case 'RELATED_UNITS':
      return {
        ...state,
        modal: 'isOpenRelatedUnitsModal',
        type: 'RELATED_UNITS',
        name: 'واحد های مرتبط',
        data: 'selectedRelatedUnits',
        selectedRelatedUnits: action.payload.data,
        isOpenRelatedUnitsModal: action.payload.showModal,
      };
    default:
      return state;
  }
};
const SubItemsQCList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { subItems } = useSelector((state: any) => state.qc);

  const [state, reduceDispatch] = useReducer(reducer, initialStateReducer);

  const handleEditClick = (params) => {
    navigate(`edit/${params.row.id}`);
  };
  const handleOpenItems = (params) => {
    let type;
    switch (params.field) {
      case 'allCheckList':
        type = 'CHECKLISTS';
        break;
      case 'allFloor':
        type = 'FLOORS';
        break;
      case 'allProjects':
        type = 'PROJECTS';
        break;
      case 'allUnit':
        type = 'UNITS';
        break;
      case 'relatedCheckList':
        type = 'RELATED_CHECKLISTS';
        break;
      case 'relatedFloor':
        type = 'RELATED_FLOORS';
        break;
      case 'relatedProjects':
        type = 'RELATED_PROJECTS';
        break;
      case 'relatedUnit':
        type = 'RELATED_UNITS';
        break;
    }
    // @ts-ignore
    reduceDispatch({
      type,
      payload: { data: params.value, showModal: true },
    });
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
    'QC_SUB_ITEMS',
    subItemsGrid,
    handleEditClick,
    handleOpenItems
  );
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    dispatch(GetAllSubItemsAction());
  };

  const handleDoubleClick = (e) => {
    navigate(`/warehouse/details/${e.row.warehouseOrderId}`);
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
          title="آیتم فرعی"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'end', pr: 10, gap: 5 }}>
          <IconButton color="success" onClick={handleShowCustomizeTabelModal}>
            <TuneIcon />
          </IconButton>
          <Button variant="outlined" onClick={() => navigate('add')}>
            <AddIcon />
            افزودن
          </Button>
        </Box>

        {columns && !subItems.pending && (
          <>
            <Grid
              columns={columns}
              rows={subItems?.data ?? []}
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
        <Dialog
          open={state[state['modal']]}
          onClose={() => {
            // @ts-ignore
            reduceDispatch({
              type: state['type'],
              payload: { data: [], showModal: false },
            });
          }}
        >
          <DialogTitle>{state['name']}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => {
              // @ts-ignore
              reduceDispatch({
                type: state['type'],
                payload: { data: [], showModal: false },
              });
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <div style={{ width: '30rem', padding: '1.6rem' }}>
              {state[state['data']]?.length > 0 && (
                <List>
                  {state[state['data']].map((subItem) => (
                    <ListItem key={subItem.id}>
                      <ListItemText>{subItem?.name}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
              {state[state['data']]?.length > 0 || (
                <Typography>
                  آیتم فرعی انتخاب شده فاقد {state['name']} میباشد
                </Typography>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </CardGrid>
  );
};
export default SubItemsQCList;
