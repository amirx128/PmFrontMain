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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewPerson,
  AddNewProject,
  GetAllBusinessRoles,
  UpdatePerson,
  UpdateProject,
} from "../../redux/features/definitionSlicer.ts";
import { toast } from "react-toastify";
import {
  AddNewUser,
  GetAllRoles,
  UpdateUser,
} from "../../redux/features/administrationSlicer.ts";

interface IAddUserProps {
  showUserDialog: boolean;
  onClose: () => void;
  selectedUserState?: any;
}

export const AddUser = ({
  showUserDialog,
  onClose,
  selectedUserState,
}: IAddUserProps) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const { roles, selectedUser, users } = useSelector(
    (state: any) => state.administrations
  );

  const [info, setInfo] = useState({
    firstName: selectedUser?.firstName,
    lastName: selectedUser?.lastName,
    userName: selectedUser?.userName,
    password: selectedUser?.password,
    isActive: selectedUser?.isActive,
    businessRoles: selectedUser?.businessRoles?.map((item) => item.id) ?? [],
    usersRoles: selectedUser?.usersRoles?.map((item) => item.id) ?? [],
    bossId: selectedUser?.bossId,
  });

  useEffect(() => {
    //@ts-ignore
    dispatch(GetAllBusinessRoles());
    //@ts-ignore
    dispatch(GetAllRoles());
  }, []);

  useEffect(() => {
    if (selectedUser && selectedUserState) {
      setInfo({
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        userName: selectedUser?.userName,
        password: selectedUser?.password,
        isActive: selectedUser?.isActive,
        businessRoles:
          selectedUser?.businessRoles?.map((item) => item.id) ?? [],
        usersRoles: selectedUser?.usersRoles?.map((item) => item.id) ?? [],
        bossId: selectedUser?.bossId,
      });
    } else {
      setInfo({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        isActive: true,
        businessRoles: [],
        usersRoles: [],
        bossId: "",
      });
    }
  }, [selectedUser, selectedUserState]);
  const { businessRoles } = useSelector((state: any) => state.definition);

  const handleChange = (e) => {
    if (e.target?.name === "isActive") {
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

  const onSubmit = () => {
    if (selectedUser && selectedUserState) {
      dispatch(UpdateUser({ id: selectedUser?.id, ...info }));
    } else {
      dispatch(AddNewUser({ ...info }));
    }
    onClose();
  };
  console.log(users.usersList);
  return (
    <Dialog
      open={showUserDialog}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"md"}
      fullScreen={mediumOrSmaller}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {selectedUser ? "ویرایش کاربر" : "افزودن کاربر"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.firstName}
          name={"firstName"}
          onChange={handleChange}
          label={"نام"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.lastName}
          name={"lastName"}
          onChange={handleChange}
          label={"نام خانوادگی"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.userName}
          name={"userName"}
          onChange={handleChange}
          label={"نام کاربری"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.password}
          name={"password"}
          onChange={handleChange}
          label={"رمزعبور"}
          type={"password"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <FormGroup sx={{ width: "100%" }}>
          <FormControlLabel
            value={info?.isActive}
            control={
              <Checkbox
                checked={info?.isActive}
                name={"isActive"}
                onChange={handleChange}
              />
            }
            label="کاربر فعال باشد"
            defaultChecked={true}
          />
        </FormGroup>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>نقش کاربری</InputLabel>
          <Select
            multiple
            value={info?.usersRoles}
            fullWidth={true}
            name={"usersRoles"}
            label="نقش کاربری"
            onChange={handleChange}
          >
            {roles?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.roleTitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>نقش تجاری</InputLabel>
          <Select
            multiple
            value={info?.businessRoles}
            fullWidth={true}
            name={"businessRoles"}
            label="نقش تجاری"
            onChange={handleChange}
          >
            {businessRoles?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>مدیر</InputLabel>
          <Select
            value={info?.bossId}
            fullWidth={true}
            name={"bossId"}
            label="مدیر"
            onChange={handleChange}
          >
            {users?.usersList?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.firstName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"success"} onClick={onSubmit}>
          {businessRoles?.addState ? <CircularProgress /> : "ثبت"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
