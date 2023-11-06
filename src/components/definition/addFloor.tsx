import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
  DialogActions,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HighlightOff } from '@mui/icons-material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddNewFloor,
  AddNewProject,
  UpdateFloor,
  GetAllCommodities,
} from '../../redux/features/definitionSlicer.ts';
import { toast } from 'react-toastify';
import AutoCompleteComponent from '../AutoComplete/AutoCompleteComponent.tsx';

const AddFloor = ({
  addFloorDialog,
  onClose,
  setCurrentProject,
  currentProject,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));

  const { projects, commodities, selectedProject, selectedFloor } = useSelector(
    (state: any) => state.definition
  );
  const [info, setInfo] = useState({
    floorName: selectedFloor?.name,
    projectId: selectedFloor?.projectId,
    code: selectedFloor?.code,
    commodities: selectedFloor?.commodities,
  });
  useEffect(() => {
    if (selectedFloor) {
      setInfo({
        floorName: selectedFloor?.name,
        projectId: selectedProject?.id,
        code: selectedFloor?.code,
        commodities: selectedFloor?.commodities,
      });
    } else {
      setInfo({
        floorName: '',
        projectId: selectedProject?.id,
        code: '',
        commodities: [],
      });
    }
  }, [selectedFloor, selectedProject]);
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
    if (selectedFloor) {
      dispatch(
        UpdateFloor({
          id: selectedFloor?.id,
          floorName: info.floorName,
          code: info.code,
          projectId: info.projectId,
          commodities: info.commodities,
        })
      );
    } else {
      dispatch(
        AddNewFloor({
          floorName: info.floorName,
          code: info.code,
          projectId: info.projectId,
          commodities: info.commodities,
        })
      );
    }
    onClose();
  };
  return (
    <Dialog
      open={addFloorDialog}
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
        {selectedFloor ? 'ویرایش طبقه' : 'افزودن طبقه'}
        <IconButton color={'error'} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.floorName}
          name={'floorName'}
          onChange={handleChange}
          label={'نام طبقه'}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.code}
          name={'code'}
          onChange={handleChange}
          label={'کد طبقه'}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <AutoCompleteComponent
          sx={{ mt: 2 }}
          options={projects?.data}
          id="projectId"
          label="پروژه"
          changeHandler={(value) =>
            setInfo((prev) => ({ ...prev, projectId: value }))
          }
          value={info?.projectId}
        />
        <FormControl fullWidth={true}>
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
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} color={'success'} onClick={onSubmit}>
          {projects?.addState ? <CircularProgress /> : 'ثبت'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AddFloor);
