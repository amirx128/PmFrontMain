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
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { PageTileComponent } from "../style";

import {
  GetAllRoles,
  UpdateUser,
  GetUserInfo,
  UpdateUserProfile,
} from "../../redux/features/administrationSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { GetAllBusinessRoles } from "../../redux/features/definitionSlicer";
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent";
const Profile = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch<any>();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const { roles, users, selectedUser } = useSelector(
    (state: any) => state.administrations
  );
  const [info, setInfo] = useState({
    firstName: selectedUser?.firstName,
    lastName: selectedUser?.lastName,
    userName: selectedUser?.userName,
    password: "",
    businessRoles: selectedUser?.businessRoles?.map((item) => item.id) ?? [],
    usersRoles: selectedUser?.usersRoles?.map((item) => item.id) ?? [],
    bossId: selectedUser?.bossId,
    repeatPassword: "",
  });
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    //@ts-ignore
    dispatch(GetAllBusinessRoles());
    //@ts-ignore
    dispatch(GetAllRoles());
    getUserInfo();
  }, []);
  useEffect(() => {
    if (selectedUser) {
      setInfo({
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        userName: selectedUser?.userName,
        password: "",
        businessRoles:
          selectedUser?.businessRoles?.map((item) => item.id) ?? [],
        usersRoles: selectedUser?.usersRoles?.map((item) => item.id) ?? [],
        bossId: selectedUser?.bossId,
        repeatPassword: "",
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
        repeatPassword: "",
      });
    }
  }, [selectedUser]);
  const { businessRoles } = useSelector((state: any) => state.definition);
  const getUserInfo = async () => {
    //@ts-ignore
    await dispatch(GetUserInfo(user?.id));
  };
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
    const model: any = { firstName: info.firstName, lastName: info.lastName };
    if (info.password) {
      model.password = info.password;
    }
    if (
      (info?.password && info?.password !== info?.repeatPassword) ||
      isShowPassword
    )
      return;
    dispatch(
      UpdateUserProfile({
        id: user?.id,
        ...model,
      })
    );
  };
  const handleCancelEdit = () => {
    setEditable(false);
    setInfo({
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      userName: selectedUser?.userName,
      password: "",
      businessRoles: selectedUser?.businessRoles?.map((item) => item.id) ?? [],
      usersRoles: selectedUser?.usersRoles?.map((item) => item.id) ?? [],
      bossId: selectedUser?.bossId,
      repeatPassword: "",
    });
  };
  return (
    <Card
      sx={{
        padding: 10,
      }}
    >
      <PageTileComponent __text={document.title} />

      <CardContent>
        {selectedUser && (
          <>
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
              disabled={true}
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <AutoCompleteComponent
                sx={{ mt: 2 }}
                options={roles?.data}
                id="usersRoles"
                label="نقش کاربری"
                changeHandler={(value) =>
                  setInfo((prev) => ({ ...prev, usersRoles: value }))
                }
                value={info?.usersRoles || []}
                dataLabel="roleTitle"
                multiple={true}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <AutoCompleteComponent
                sx={{ mt: 2 }}
                options={businessRoles?.data}
                id="businessRoles"
                label="نقش تجاری"
                changeHandler={(value) =>
                  setInfo((prev) => ({ ...prev, businessRoles: value }))
                }
                value={info?.businessRoles || []}
                multiple={true}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <AutoCompleteComponent
                sx={{ mt: 2 }}
                options={users?.usersList}
                id="bossId"
                label="مدیر"
                changeHandler={(value) =>
                  setInfo((prev) => ({ ...prev, bossId: value }))
                }
                value={info?.bossId}
                dataLabel="firstName"
              />
            </FormControl>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isShowPassword}
                    onChange={() => setIsShowPassword((prev) => !prev)}
                    color="info"
                  />
                }
                label="تغییر رمز عبور"
                dir="ltr"
                sx={{ ml: 1 }}
              />
            </div>
            <TextField
              error={editable && !info?.password}
              helperText={
                editable && !info?.password && "رمز عبور نباید خالی باشد"
              }
              value={info?.password}
              name={"password"}
              onChange={handleChange}
              label={"رمزعبور"}
              type={"password"}
              fullWidth={true}
              sx={{ mt: 2, display: isShowPassword ? "block" : "none" }}
              disabled={!editable}
            />
            <TextField
              value={info?.repeatPassword}
              error={editable && info?.password !== info.repeatPassword}
              helperText={
                editable &&
                info?.password !== info.repeatPassword &&
                "رمز عبور و تکرار آن باید برابر باشد"
              }
              name={"repeatPassword"}
              onChange={handleChange}
              label={"تکرار رمز عبور"}
              type={"password"}
              fullWidth={true}
              sx={{ mt: 2, display: isShowPassword ? "block" : "none" }}
              disabled={!editable}
            />
          </>
        )}
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
