import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewSubItemAction,
  GetAllOriginalItemsAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
const AddSubItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { AddNewSubItem, originalItems } = useSelector(
    (state: any) => state?.qc
  );

  const [info, setInfo] = useState({
    name: "",
    originalItemId: undefined,
  });

  useEffect(() => {
    getAllOriginalItems();
  }, []);

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
      AddNewSubItemAction({
        name: info.name,
        originalItemId: info.originalItemId,
      })
    );
  };
  return (
    <Card>
      <CardHeader title="افزودن آیتم فرعی" sx={{ textAlign: "left" }} />
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
          loading={AddNewSubItem?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/subItems")}
          disabled={AddNewSubItem?.pending && AddNewSubItem?.pending}
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddSubItem;
