import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewCheckListAction,
  GetAllSubItemsAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
const AddCheckListItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { subItems, checkListAddState } = useSelector(
    (state: any) => state?.qc
  );
  const [info, setInfo] = useState({
    name: "",
    subItemId: "",
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSubItems();
  }, []);

  const getSubItems = async () => {
    await dispatch(GetAllSubItemsAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      AddNewCheckListAction({
        name: info.name,
        subItemId: +info.subItemId,
        items: items.map((item) => ({ itemName: item.itemName })),
      })
    );
  };
  const handleNewItem = () => {
    setItems((prev) => [...prev, { id: prev.length, itemName: "" }]);
  };
  const handleChangeItem = (e, item) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, itemName: e.target.value } : p
      )
    );
  };
  const handleRemoveItem = (item) => {
    setItems((prev) => prev.filter((p) => p.id !== item.id));
  };
  return (
    <Card>
      <CardHeader title="افزودن چک لیست " sx={{ textAlign: "left" }} />
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
          <InputLabel>آیتم فرعی</InputLabel>
          <Select
            value={info?.subItemId}
            fullWidth={true}
            name={"subItemId"}
            label="آیتم فرعی"
            onChange={handleChange}
          >
            {subItems?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {items?.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginTop: 10,
            }}
            className="w-full"
          >
            <TextField
              value={item.itemName}
              onChange={(e) => handleChangeItem(e, item)}
              label={"نام"}
              className="w-1/2"
            />
            <IconButton onClick={() => handleRemoveItem(item)}>
              <ClearIcon color="error" />
            </IconButton>
          </div>
        ))}
        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleNewItem}>
          اضافه کردن آیتم جدید +
        </Button>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          color="success"
          variant="contained"
          onClick={hanldeSubmit}
          loading={checkListAddState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/checkLists")}
          disabled={checkListAddState.pending && checkListAddState?.pending}
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddCheckListItem;
