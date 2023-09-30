import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewOriginalItemAction,
  AddNewSubItemAction,
  GetAllOriginalItemsAction,
  GetAllSubItemsAction,
  GetSubItemsDataAction,
  UpdateSubItemAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import JalaliDatePicker from "../../components/date-picker/date-picker";
import { GetUsersListAction } from "../../redux/features/administrationSlicer";
const EditSubItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { subItemsUpdateState, originalItems, selectedSubItem } = useSelector(
    (state: any) => state?.qc
  );
  const { usersList } = useSelector(
    (state: any) => state?.administrations?.users
  );

  const [info, setInfo] = useState({
    name: "",
    originalItemId: 0,
  });

  useEffect(() => {
    getSubItem();
    getAllOriginalItems();
  }, []);

  useEffect(() => {
    if (selectedSubItem?.data) {
      setInfo({
        ...info,
        name: selectedSubItem?.data.name,
        originalItemId: selectedSubItem?.data.originalItemId,
      });
    }
  }, [selectedSubItem]);
  const getSubItem = async () => {
    await dispatch(GetSubItemsDataAction({ selectedItemId: +id }));
  };
  const getAllOriginalItems = async () => {
    await dispatch(GetAllOriginalItemsAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      UpdateSubItemAction({
        id: +id,
        data: {
          name: info.name,
          originalItemId: info.originalItemId,
        },
      })
    );
    await getSubItem();
  };
  return (
    <Card>
      <CardHeader title="ویرایش آیتم فرعی" sx={{ textAlign: "left" }} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TextField
          value={info?.name}
          name={"name"}
          onChange={handleChange}
          label={"نام"}
          sx={{ mt: 2, width: "50%" }}
        />
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>آیتم اصلی</InputLabel>
          <Select
            value={info?.originalItemId}
            fullWidth={true}
            name={"originalItemId"}
            label="آیتم اصلی"
            onChange={handleChange}
          >
            {originalItems?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          color="success"
          variant="contained"
          onClick={hanldeSubmit}
          loading={subItemsUpdateState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/subItems")}
          disabled={
            subItemsUpdateState?.pending && subItemsUpdateState?.pending
          }
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditSubItem;
