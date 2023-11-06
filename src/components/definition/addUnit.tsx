import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HighlightOff } from '@mui/icons-material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddNewUnit,
  getAllFloors,
  UpdateUnit,
  GetAllCommodities,
  GetOneProjectFloorAction,
} from '../../redux/features/definitionSlicer.ts';
import AutoCompleteComponent from '../AutoComplete/AutoCompleteComponent.tsx';

const AddUnit = ({ addUnitDialog, selectedUnit, onClose, currentProject }) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    projects,
    units,
    floors,
    commodities,
    oneProjectFloor,
    selectedProject,
    selectedFloor,
  } = useSelector((state: any) => state.definition);

  const [info, setInfo] = useState({
    unitName: '',
    projectfloorId: undefined,
    code: undefined,
    commodities: undefined,
  });

  useEffect(() => {
    if (selectedProject) {
      dispatch(
        GetOneProjectFloorAction({ selectedItemId: +selectedProject?.id })
      );
      setInfo({ ...info });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedUnit) {
      setInfo({
        unitName: selectedUnit?.name,
        projectfloorId: selectedUnit?.projectfloorId,
        code: selectedUnit?.code,
        commodities: selectedUnit?.commodities,
      });
    } else {
      setInfo({
        unitName: '',
        projectfloorId: selectedFloor?.id,
        code: '',
        commodities: [],
      });
    }
  }, [selectedUnit, selectedFloor]);
  useEffect(() => {
    getAllCommodities();
  }, []);

  const getAllCommodities = async () => {
    await dispatch(GetAllCommodities());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const onSubmit = () => {
    if (selectedUnit) {
      dispatch(
        UpdateUnit({
          id: selectedUnit?.id,
          unitName: info.unitName,
          projectfloorId: info.projectfloorId,
          code: info.code,
          commodities: info.commodities,
        })
      );
    } else {
      dispatch(
        AddNewUnit({
          unitName: info.unitName,
          projectfloorId: info.projectfloorId,
          code: info.code,
          commodities: info.commodities,
        })
      );
    }
    onClose();
  };
  return (
    <>
      <Dialog
        open={addUnitDialog}
        onClose={onClose}
        fullWidth={true}
        maxWidth={'md'}
        fullScreen={mediumOrSmaller}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {selectedUnit ? 'ویرایش واحد' : 'افزودن واحد'}
          <IconButton color={'error'} onClick={onClose}>
            <HighlightOff />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {oneProjectFloor.pending && <CircularProgress />}
          {!oneProjectFloor.pending && (
            <>
              <TextField
                value={info?.unitName}
                name={'unitName'}
                onChange={handleChange}
                label={'نام واحد'}
                fullWidth={true}
                sx={{ mt: 2 }}
              />
              <TextField
                value={info?.code}
                name={'code'}
                onChange={handleChange}
                label={'کد واحد'}
                fullWidth={true}
                sx={{ mt: 2 }}
              />

              <AutoCompleteComponent
                sx={{ mt: 2 }}
                options={oneProjectFloor?.data}
                id="projectfloorId"
                label="طبقه"
                changeHandler={(value) =>
                  setInfo((prev) => ({ ...prev, projectfloorId: value }))
                }
                value={info?.projectfloorId ?? selectedFloor?.id}
              />

              <FormControl fullWidth={true}>
                <Typography sx={{ mt: 2 }}>کالا ها</Typography>
                <AutoCompleteComponent
                  sx={{ mt: 2 }}
                  options={commodities?.data}
                  id="commodities"
                  label="کالا ها"
                  changeHandler={(value) =>
                    setInfo((prev) => ({ ...prev, commodities: value }))
                  }
                  dataLabel="serchableName"
                  value={info?.commodities || []}
                  multiple={true}
                />
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} color={'success'} onClick={onSubmit}>
            {units?.addState ? <CircularProgress /> : 'ثبت'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(AddUnit);
