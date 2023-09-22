import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  GetAllRoles,
  UpdateUser,
} from "../../redux/features/administrationSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { GetAllBusinessRoles } from "../../redux/features/definitionSlicer";
const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const { roles, users } = useSelector((state: any) => state.administrations);
  const [info, setInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    password: user?.password,
    businessRoles: user?.businessRoles?.map((item) => item.id) ?? [],
    usersRoles: user?.usersRoles?.map((item) => item.id) ?? [],
    bossId: user?.bossId,
  });
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    //@ts-ignore
    dispatch(GetAllBusinessRoles());
    //@ts-ignore
    dispatch(GetAllRoles());
  }, []);

  useEffect(() => {
    if (user) {
      setInfo({
        firstName: user?.firstName,
        lastName: user?.lastName,
        userName: user?.userName,
        password: user?.password,
        businessRoles: user?.businessRoles?.map((item) => item.id) ?? [],
        usersRoles: user?.usersRoles?.map((item) => item.id) ?? [],
        bossId: user?.bossId,
      });
    } else {
      setInfo({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        businessRoles: [],
        usersRoles: [],
        bossId: "",
      });
    }
  }, [user]);
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
  const handleEdit = () => {
    setEditable(true);
  };
  const handleSubmit = () => {
    dispatch(UpdateUser({ id: user?.id, ...info }));
  };
  const handleCancelEdit = () => {
    setEditable(false);
  };
  return (
    <Card
      sx={{
        padding: 10,
      }}
    >
      <Typography variant="h5">اطلاعات کاربر</Typography>
      <CardContent>
        <TextField
          value={info?.firstName}
          name={"firstName"}
          onChange={handleChange}
          label={"نام"}
          fullWidth={true}
          sx={{ mt: 2 }}
          disabled={!editable}
        />
        <TextField
          value={info?.lastName}
          name={"lastName"}
          onChange={handleChange}
          label={"نام خانوادگی"}
          fullWidth={true}
          sx={{ mt: 2 }}
          disabled={!editable}
        />
        <TextField
          value={info?.userName}
          name={"userName"}
          onChange={handleChange}
          label={"نام کاربری"}
          fullWidth={true}
          sx={{ mt: 2 }}
          disabled={!editable}
        />
        <TextField
          value={info?.password}
          name={"password"}
          onChange={handleChange}
          label={"رمزعبور"}
          type={"password"}
          fullWidth={true}
          sx={{ mt: 2 }}
          disabled={!editable}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>نقش کاربری</InputLabel>
          <Select
            multiple
            value={info?.usersRoles}
            fullWidth={true}
            name={"usersRoles"}
            label="نقش کاربری"
            onChange={handleChange}
            disabled={!editable}
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
            disabled={!editable}
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
            disabled={!editable}
          >
            {users?.usersList?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.firstName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        {!editable && (
          <Button variant={"contained"} color={"warning"} onClick={handleEdit}>
            ویرایش
          </Button>
        )}
        {editable && (
          <>
            <Button
              variant={"contained"}
              color={"success"}
              onClick={handleSubmit}
              disabled={users.addState}
            >
              تایید
            </Button>
            <Button
              variant={"contained"}
              color={"error"}
              onClick={handleCancelEdit}
              disabled={users.addState}
            >
              انصراف
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Profile;
