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
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HighlightOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetAllBusinessRoles,
  GetAllPersons,
  getAllProjects,
} from '../../redux/features/definitionSlicer.ts';
import { toast } from 'react-toastify';
import {
  AddNewUser,
  GetAllRoles,
  UpdateUser,
} from '../../redux/features/administrationSlicer.ts';
import AutoCompleteComponent from '../AutoComplete/AutoCompleteComponent.tsx';
import UploadFIle from '../File/UploadFIle.tsx';
import axios from 'axios';
import axiosInstance from '../../utils/axios.config.ts';

interface IAddUserProps {
  showUserDialog: boolean;
  onClose: () => void;
}

export const AddUser = ({ showUserDialog, onClose }: IAddUserProps) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const { roles, selectedUser, users } = useSelector(
    (state: any) => state.administrations
  );
  const { persons, projects } = useSelector((state: any) => state.definition);
  const [signatureUrl, setSignatureUrl] = useState<string>();
  const [signatureFile, setSignatureFile] = useState([]);
  const [info, setInfo] = useState({
    // firstName: selectedUser?.firstName,
    // lastName: selectedUser?.lastName,
    userName: selectedUser?.userName,
    password: selectedUser?.password,
    isActive: selectedUser?.isActive,
    businessRoles: selectedUser?.businessRoles?.map((item) => item.id) ?? [],
    usersRoles: selectedUser?.usersRoles?.map((item) => item.id) ?? [],
    bossId: selectedUser?.bossId,
    projectId: selectedUser?.projectId,
    personId: selectedUser?.personId,
  });

  useEffect(() => {
    //@ts-ignore
    dispatch(GetAllBusinessRoles());
    //@ts-ignore
    dispatch(GetAllRoles());
    //@ts-ignore
    dispatch(getAllProjects());
    //@ts-ignore
    dispatch(GetAllPersons());
    return () => {
      setSignatureFile([]);
      setSignatureUrl('');
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setInfo({
        // firstName: selectedUser?.firstName,
        // lastName: selectedUser?.lastName,
        userName: selectedUser?.userName,
        password: selectedUser?.password,
        isActive: selectedUser?.isActive,
        businessRoles:
          selectedUser?.businessRoles?.map((item) => item.id) ?? [],
        usersRoles: selectedUser?.usersRoles?.map((item) => item.id) ?? [],
        bossId: selectedUser?.bossId,
        projectId: selectedUser?.projectId,
        personId: selectedUser?.personId,
      });
    } else {
      setSignatureUrl('');
      setSignatureFile([]);
      setInfo({
        // firstName: "",
        // lastName: "",
        userName: '',
        password: '',
        isActive: true,
        businessRoles: [],
        usersRoles: [],
        bossId: '',
        projectId: '',
        personId: '',
      });
    }
  }, [selectedUser]);
  useEffect(() => {
    if (selectedUser?.userHasSignature) {
      getSignatureFile();
    }
  }, [selectedUser]);
  const { businessRoles } = useSelector((state: any) => state.definition);

  const handleChange = (e) => {
    if (e.target?.name === 'isActive') {
      setInfo({
        ...info,
        [e.target?.name]: e.target?.checked,
      });
    } else {
      setInfo({
        ...info,
        [e.target?.name]: e.target?.value,
      });
    }
  };
  const getSignatureFile = async () => {
    const result = await axiosInstance.post(
      '/Administration/DownloadUserSignature',
      {
        userId: selectedUser.id,
      },
      {
        responseType: 'blob',
      }
    );

    const blob = new Blob([result.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    setSignatureUrl(url);
  };

  const onSubmit = () => {
    if (selectedUser) {
      dispatch(
        UpdateUser({
          id: selectedUser?.id,
          SignatureFile: signatureFile,
          ...info,
        })
      );
    } else {
      dispatch(AddNewUser({ ...info, SignatureFile: signatureFile }));
    }
    onClose();
  };
  const handleChangeAutoComplete = (val, name) => {
    setInfo({
      ...info,
      [name]: val,
    });
  };
  const handleUploadFile = (e) => {
    setSignatureFile([e.target.files[0]]);
  };
  return (
    <Dialog
      open={showUserDialog}
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
        {selectedUser ? 'ویرایش کاربر' : 'افزودن کاربر'}
        <IconButton color={'error'} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ width: '20%' }}>نام</Typography>
          <TextField
            value={
              persons?.data?.find((person) => person?.id == info?.personId)
                ?.firstName
            }
            name={'firstName'}
            onChange={handleChange}
            fullWidth={true}
            sx={{ mt: 2 }}
            disabled
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ width: '20%' }}>نام خانوادگی</Typography>
          <TextField
            // value={info?.lastName}
            value={
              persons?.data?.find((person) => person?.id == info?.personId)
                ?.lastName
            }
            name={'lastName'}
            onChange={handleChange}
            fullWidth={true}
            sx={{ mt: 2 }}
            disabled
          />
        </div>
        <TextField
          value={info?.userName}
          name={'userName'}
          onChange={handleChange}
          label={'نام کاربری'}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.password}
          name={'password'}
          onChange={handleChange}
          label={'رمزعبور'}
          type={'password'}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <div className="w-full flex justify-between items-center">
          <FormControlLabel
            value={info?.isActive}
            control={
              <Checkbox
                checked={info?.isActive}
                name={'isActive'}
                onChange={handleChange}
              />
            }
            label="کاربر فعال باشد"
            defaultChecked={true}
          />
          <div>
            <UploadFIle
              canDelete
              maxFileUpload={1}
              text="آپلود فایل امضا"
              hasPreview
              previewUrl={signatureUrl}
              onEditFile={() => {
                setSignatureUrl('');
              }}
              changeHandler={handleUploadFile}
              defaultValue={signatureFile}
              removeHandler={() => {
                setSignatureFile([]);
              }}
              downloadable={false}
            />
          </div>
        </div>
        <AutoCompleteComponent
          sx={{ mt: 2 }}
          options={roles?.data}
          dataId="id"
          dataLabel="roleTitle"
          id="usersRoles"
          label="نقش کاربری"
          changeHandler={(value) => {
            setInfo((prev) => ({ ...prev, usersRoles: value }));
          }}
          value={info?.usersRoles || []}
          multiple={true}
        />
        <AutoCompleteComponent
          sx={{ mt: 2 }}
          options={businessRoles?.data}
          dataId="id"
          dataLabel="name"
          id="businessRoles"
          label="نقش تجاری"
          changeHandler={(value) =>
            setInfo((prev) => ({ ...prev, businessRoles: value }))
          }
          value={info?.businessRoles || []}
          multiple={true}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <AutoCompleteComponent
            label="مدیر"
            id="bossId"
            options={users?.usersList || []}
            value={info?.bossId}
            dataLabel="firstName"
            changeHandler={(value) => handleChangeAutoComplete(value, 'bossId')}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <AutoCompleteComponent
            label="پروژه"
            id="projectId"
            options={projects?.data || []}
            value={info?.projectId}
            changeHandler={(value) =>
              handleChangeAutoComplete(value, 'projectId')
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <AutoCompleteComponent
            label="شخص"
            id="personId"
            options={persons?.data || []}
            value={info?.personId}
            dataLabel={['firstName', 'lastName']}
            changeHandler={(value) =>
              handleChangeAutoComplete(value, 'personId')
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} color={'success'} onClick={onSubmit}>
          {businessRoles?.addState ? <CircularProgress /> : 'ثبت'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
