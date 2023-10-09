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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllBusinessRoles,
  GetAllPersons,
  getAllProjects,
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
}

export const AddUser = ({ showUserDialog, onClose }: IAddUserProps) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const { roles, selectedUser, users } = useSelector(
    (state: any) => state.administrations
  );
  const { persons, projects } = useSelector((state: any) => state.definition);

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
      setInfo({
        // firstName: "",
        // lastName: "",
        userName: "",
        password: "",
        isActive: true,
        businessRoles: [],
        usersRoles: [],
        bossId: "",
        projectId: "",
        personId: "",
      });
    }
  }, [selectedUser]);
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
    if (selectedUser) {
      dispatch(UpdateUser({ id: selectedUser?.id, ...info }));
    } else {
      dispatch(AddNewUser({ ...info }));
    }
    onClose();
  };
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "20%" }}>نام</Typography>
          <TextField
            value={
              persons?.data?.find((person) => person?.id == info?.personId)
                ?.firstName
            }
            name={"firstName"}
            onChange={handleChange}
            fullWidth={true}
            sx={{ mt: 2 }}
            disabled
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "20%" }}>نام خانوادگی</Typography>
          <TextField
            // value={info?.lastName}
            value={
              persons?.data?.find((person) => person?.id == info?.personId)
                ?.lastName
            }
            name={"lastName"}
            onChange={handleChange}
            fullWidth={true}
            sx={{ mt: 2 }}
            disabled
          />
        </div>
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
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>پروژه</InputLabel>
          <Select
            value={info?.projectId}
            fullWidth={true}
            name={"projectId"}
            label="پروژه"
            onChange={handleChange}
          >
            {projects?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>شخص</InputLabel>
          <Select
            value={info?.personId}
            fullWidth={true}
            name={"personId"}
            label="شخص"
            onChange={handleChange}
          >
            {persons?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.firstName} {item?.lastName}
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
